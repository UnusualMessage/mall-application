using Core.Entities;
using Core.Interfaces.Repositories;

using Infrastructure.Context;
using Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CategoryRepository : Repository<Category>, ICategoryRepository
{
    public CategoryRepository(ApplicationContext applicationContext) : base(applicationContext)
    {
    }

    public override async Task<Category?> UpdateAsync(Category entity)
    {
        try
        {
            var selected = await ApplicationContext.Set<Category>().FirstOrDefaultAsync(e => e.Id == entity.Id);

            if (selected is null)
            {
                throw new NullReferenceException();
            }

            selected.Update(entity);
            await ApplicationContext.SaveChangesAsync();

            return await GetByIdAsync(entity.Id);
        }
        catch (DbUpdateException)
        {
            throw new InvalidOperationException();
        }
    }
}