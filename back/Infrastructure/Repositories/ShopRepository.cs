using Core.Entities;
using Core.Interfaces.Repositories;

using Infrastructure.Context;
using Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ShopRepository : Repository<Shop>, IShopRepository
{
    public ShopRepository(ApplicationContext applicationContext) : base(applicationContext)
    {
    }

    public override async Task<Shop?> GetByIdAsync(Guid id)
    {
        return await ApplicationContext.Set<Shop>()
            .Include(e => e.Route)
            .Include(e => e.Category)
            .Include(e => e.Breadcrumb)
            .Include(e => e.Image)
            .Include(e => e.Socials)
            .Include(e => e.Gallery)
            .Include(e => e.Cell)
            .FirstOrDefaultAsync(shop => shop.Id == id);
    }

    public override async Task<IEnumerable<Shop>> GetAllAsync()
    {
        return await ApplicationContext.Set<Shop>()
            .Include(e => e.Route)
            .Include(e => e.Breadcrumb)
            .Include(e => e.Category)
            .Include(e => e.Image)
            .Include(e => e.Socials)
            .Include(e => e.Gallery)
            .Include(e => e.Cell)
            .ToListAsync();
    }
}