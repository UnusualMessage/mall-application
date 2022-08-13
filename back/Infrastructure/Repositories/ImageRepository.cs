using Core.Entities;
using Core.Interfaces.Repositories;
using Infrastructure.Context;
using Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ImageRepository : Repository<Image>, IImageRepository
{
    public ImageRepository(ApplicationContext applicationContext) : base(applicationContext)
    {
    }

    public override async Task<Image> UpdateAsync(Image entity)
    {
        var selected = await ApplicationContext.Set<Image>().FirstOrDefaultAsync(e => e.Id == entity.Id);

        selected?.Update(entity);

        await ApplicationContext.SaveChangesAsync();

        return await GetByIdAsync(entity.Id);
    }
}