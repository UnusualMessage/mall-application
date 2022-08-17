using Core.Entities;
using Core.Interfaces.Repositories;

using Infrastructure.Context;
using Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class DiscountRepository : Repository<Discount>, IDiscountRepository
{
    public DiscountRepository(ApplicationContext applicationContext) : base(applicationContext)
    {
    }
    
    public override async Task<Discount?> GetByIdAsync(Guid? id)
    {
        return await ApplicationContext.Set<Discount>()
            .Include(e => e.Route)
            .Include(e => e.Breadcrumb)
            .Include(e => e.Image)
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public override async Task<IEnumerable<Discount>> GetAllAsync()
    {
        return await ApplicationContext.Set<Discount>()
            .Include(e => e.Route)
            .Include(e => e.Breadcrumb)
            .Include(e => e.Image)
            .ToListAsync();
    }

    public override async Task<Discount> UpdateAsync(Discount entity)
    {
        var selected = await ApplicationContext.Set<Discount>().FirstOrDefaultAsync(e => e.Id == entity.Id);

        selected?.Update(entity);

        await ApplicationContext.SaveChangesAsync();

        return await GetByIdAsync(entity.Id);
    }
}