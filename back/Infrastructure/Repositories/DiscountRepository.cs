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
            .Include(e => e.Shop)
                .ThenInclude(e => e.Gallery)
            
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
            .Include(e => e.Shop)
                .ThenInclude(e => e.Gallery)
            
            .ToListAsync();
    }
}