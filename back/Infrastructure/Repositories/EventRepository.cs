using Core.Entities;
using Core.Interfaces.Repositories;

using Infrastructure.Context;
using Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class EventRepository : Repository<Event>, IEventRepository
{
    public EventRepository(ApplicationContext applicationContext) : base(applicationContext)
    {
    }
    
    public override async Task<Event?> GetByIdAsync(Guid? id)
    {
        return await ApplicationContext.Set<Event>()
            .Include(e => e.Route)
            .Include(e => e.Breadcrumb)
            .Include(e => e.Image)
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public override async Task<IEnumerable<Event>> GetAllAsync()
    {
        return await ApplicationContext.Set<Event>()
            .Include(e => e.Route)
            .Include(e => e.Breadcrumb)
            .Include(e => e.Image)
            .ToListAsync();
    }

    public override async Task<Event> UpdateAsync(Event entity)
    {
        var selected = await ApplicationContext.Set<Event>().FirstOrDefaultAsync(e => e.Id == entity.Id);

        selected?.Update(entity);

        await ApplicationContext.SaveChangesAsync();

        return await GetByIdAsync(entity.Id);
    }
}