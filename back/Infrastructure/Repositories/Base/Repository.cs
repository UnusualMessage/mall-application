using Core.Entities.Base;
using Core.Exceptions;
using Core.Interfaces.Repositories.Base;

using Infrastructure.Context;

using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories.Base;

public abstract class Repository<T> : IRepository<T> where T : Entity<T>
{
    protected readonly ApplicationContext ApplicationContext;

    protected Repository(ApplicationContext applicationContext)
    {
        ApplicationContext = applicationContext;
    }

    public virtual async Task<T?> AddAsync(T entity)
    {
        try
        {
            await ApplicationContext.Set<T>().AddAsync(entity);
            await ApplicationContext.SaveChangesAsync();

            return await GetByIdAsync(entity.Id);
        }
        catch (DbUpdateException)
        {
            throw new InvalidCastException();
        }
    }

    public virtual async Task<T?> DeleteByIdAsync(Guid id)
    {
        try
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
        catch (DbUpdateException)
        {
            throw new InvalidOperationException();
        }
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync()
    {
        return await ApplicationContext.Set<T>().ToListAsync();
    }

    public virtual async Task<T?> GetByIdAsync(Guid id)
    {
        return await ApplicationContext.Set<T>().FindAsync(id);
    }

    public virtual async Task<T?> UpdateAsync(T entity)
    {
        try
        {
            var selected = await ApplicationContext.Set<T>().FirstOrDefaultAsync(e => e.Id == entity.Id);

            selected?.Update(entity);

            await ApplicationContext.SaveChangesAsync();

            return await GetByIdAsync(entity.Id);
        }
        catch (DbUpdateException)
        {
            throw new InvalidOperationException();
        }   
    }
}