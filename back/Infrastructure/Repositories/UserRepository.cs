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