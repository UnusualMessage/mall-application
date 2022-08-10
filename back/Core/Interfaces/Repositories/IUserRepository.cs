using Core.Entities;
using Core.Interfaces.Repositories.Base;

namespace Core.Interfaces.Repositories;

public interface IUserRepository : IRepository<User>
{
    public Task<User?> GetUserByLoginAsync(string name);

    public Task<User?> GetUserByTokenAsync(string token);
}