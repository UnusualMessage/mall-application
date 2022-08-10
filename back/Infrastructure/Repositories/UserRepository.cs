using Core.Entities;
using Core.Interfaces.Repositories;

using Infrastructure.Context;
using Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(ApplicationContext applicationContext) : base(applicationContext)
    {
    }

    public override async Task<User> UpdateAsync(User entity)
    {
        var selected = await ApplicationContext.Set<User>().FirstOrDefaultAsync(e => e.Id == entity.Id);

        selected?.Set(entity);

        await ApplicationContext.SaveChangesAsync();

        return await GetByIdAsync(entity.Id);
    }
    
    public async Task<User?> GetUserByLoginAsync(string name)
    {
        return await ApplicationContext.Set<User>()
            .Include(x => x.RefreshTokens)
            .FirstOrDefaultAsync(e => e.Login == name);
    }

    public async Task<User?> GetUserByTokenAsync(string token)
    {
        return await ApplicationContext.Set<User>()
            .Include(x => x.RefreshTokens)
            .FirstOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));
    }
}