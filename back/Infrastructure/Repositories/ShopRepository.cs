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

    public override async Task<Shop> UpdateAsync(Shop entity)
    {
        var selected = await ApplicationContext.Set<Shop>().FirstOrDefaultAsync(e => e.Id == entity.Id);

        selected?.Set(entity);

        await ApplicationContext.SaveChangesAsync();

        return await GetByIdAsync(entity.Id);
    }
}