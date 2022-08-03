using Core.Entities.Base;
using Core.Interfaces.Repositories.Base;

using Infrastructure.Context;

using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories.Base;

public abstract class Repository<T> : IRepository<T> where T : Entity
{
    protected readonly ApplicationContext ApplicationContext;

    protected Repository(ApplicationContext applicationContext)
    {
        ApplicationContext = applicationContext;
    }

    public virtual async Task<T?> AddAsync(T entity)
    {
        await ApplicationContext.Set<T>().AddAsync(entity);
        await ApplicationContext.SaveChangesAsync();

        return await GetByIdAsync(entity.Id);
    }

    public virtual async Task<T?> DeleteByIdAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);

        if (entity == null)
        {
            return null;
        }
        
        ApplicationContext.Set<T>().Remove(entity);
        await ApplicationContext.SaveChangesAsync();

        return entity;
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync()
    {
        return await ApplicationContext.Set<T>().ToListAsync();
    }

    public virtual async Task<T?> GetByIdAsync(Guid id)
    {
        return await ApplicationContext.Set<T>().FindAsync(id);
    }

    public abstract Task<T> UpdateAsync(T entity);
}