using Core.Entities;
using Core.Interfaces.Repositories;
using Infrastructure.Context;
using Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class RouteRepository : Repository<Route>, IRouteRepository
{
    public RouteRepository(ApplicationContext applicationContext) : base(applicationContext)
    {
    }

    public override async Task<Route?> UpdateAsync(Route entity)
    {
        try
        {
            var selected = await ApplicationContext.Set<Route>().FirstOrDefaultAsync(e => e.Id == entity.Id);

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