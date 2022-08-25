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
    
    public override async Task<Discount?> GetByIdAsync(Guid id)
    {
        return await ApplicationContext.Set<Discount>()
            .Include(e => e.Route)
            .Include(e => e.Breadcrumb)
            .Include(e => e.Image)
            
            .Include(e => e.Shop)
                .ThenInclude(e => e.Image)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Breadcrumb)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Route)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Cell)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Socials)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Category)
            
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public override async Task<IEnumerable<Discount>> GetAllAsync()
    {
        return await ApplicationContext.Set<Discount>()
            .Include(e => e.Route)
            .Include(e => e.Breadcrumb)
            .Include(e => e.Image)
            
            .Include(e => e.Shop)
                .ThenInclude(e => e.Image)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Breadcrumb)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Route)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Cell)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Socials)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Category)
            
            .ToListAsync();
    }

    public override async Task<Discount?> UpdateAsync(Discount entity)
    {
        try
        {
            var selected = await ApplicationContext.Set<Discount>().FirstOrDefaultAsync(e => e.Id == entity.Id);

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