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

    public override async Task<Shop?> GetByIdAsync(Guid? id)
    {
        return await ApplicationContext.Set<Shop>()
            .Include(e => e.Route)
            .Include(e => e.Categories)
            .Include(e => e.Breadcrumb)
            .FirstOrDefaultAsync(shop => shop.Id == id);
    }

    public override async Task<IEnumerable<Shop>> GetAllAsync()
    {
        return await ApplicationContext.Set<Shop>()
            .Include(e => e.Route)
            .Include(e => e.Breadcrumb)
            .Include(e => e.Categories)
            .ToListAsync();
    }

    public override async Task<Shop> UpdateAsync(Shop entity)
    {
        var selected = await ApplicationContext.Set<Shop>().FirstOrDefaultAsync(e => e.Id == entity.Id);
        
        selected?.Update(entity);

        await ApplicationContext.SaveChangesAsync();

        return await GetByIdAsync(entity.Id);
    }
}