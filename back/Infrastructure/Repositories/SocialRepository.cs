using Core.Entities;
using Core.Interfaces.Repositories;
using Infrastructure.Context;
using Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class SocialRepository : Repository<Social>, ISocialRepository
{
    public SocialRepository(ApplicationContext applicationContext) : base(applicationContext)
    {
    }

    public override async Task<Social?> UpdateAsync(Social entity)
    {
        try
        {
            var selected = await ApplicationContext.Set<Social>().FirstOrDefaultAsync(e => e.Id == entity.Id);

            selected?.Update(entity);

            await ApplicationContext.SaveChangesAsync();

            return await GetByIdAsync(entity.Id);
        }
        catch (DbUpdateException)
        {
            return null;
        }
    }
}