using Core.Entities;
using Core.Interfaces.Repositories;

using Infrastructure.Context;
using Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class RefreshTokenRepository : Repository<RefreshToken>, IRefreshTokenRepository
{
    public RefreshTokenRepository(ApplicationContext applicationContext) : base(applicationContext)
    {
    }

    public override async Task<RefreshToken?> UpdateAsync(RefreshToken entity)
    {
        try
        {
            var selected = await ApplicationContext.Set<RefreshToken>().FirstOrDefaultAsync(e => e.Id == entity.Id);

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