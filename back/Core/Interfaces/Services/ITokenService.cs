using Core.Entities;

namespace Core.Interfaces.Services;

public interface ITokenService
{
    public AccessToken GetGeneratedAccessToken(User user);
    public RefreshToken GetGeneratedRefreshToken(string ipAddress);
}