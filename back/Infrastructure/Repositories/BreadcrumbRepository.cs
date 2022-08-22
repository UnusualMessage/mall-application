using Core.Entities;
using Core.Interfaces.Repositories;
using Infrastructure.Context;
using Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class BreadcrumbRepository : Repository<Breadcrumb>, IBreadcrumbRepository
{
    public BreadcrumbRepository(ApplicationContext applicationContext) : base(applicationContext)
    {
    }

    public override async Task<Breadcrumb?> UpdateAsync(Breadcrumb entity)
    {
        try
        {
            var selected = await ApplicationContext.Set<Breadcrumb>().FirstOrDefaultAsync(e => e.Id == entity.Id);

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