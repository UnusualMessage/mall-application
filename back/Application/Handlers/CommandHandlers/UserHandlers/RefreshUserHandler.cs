using MediatR;

using Application.Requests.Commands.User;
using Application.Responses.User;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;

namespace Application.Handlers.CommandHandlers.UserHandlers;

public class RefreshUserHandler : IRequestHandler<RefreshUser, AuthenticateUserResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;

    public RefreshUserHandler(IUserRepository repository, ITokenService service)
    {
        _userRepository = repository;
        _tokenService = service;
    }
    
    public async Task<AuthenticateUserResponse> Handle(RefreshUser request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserByTokenAsync(request.RefreshToken ?? "");
        
        if (user is null)
        {
            return FailAuthentication();
        }

        var refreshToken = user.RefreshTokens.Single(x => x.Token == request.RefreshToken);

        if (refreshToken.IsActive == false)
        {
            return FailAuthentication();
        }

        var newRefreshToken = _tokenService.GetGeneratedRefreshToken(request.IpAddress ?? "");

        refreshToken.Revoked = DateTime.UtcNow;
        refreshToken.RevokedByIp = request.IpAddress;
        refreshToken.ReplacedByToken = newRefreshToken.Token;
        user.RefreshTokens.Add(newRefreshToken);

        await _userRepository.UpdateAsync(user);

        var jwt = _tokenService.GetGeneratedAccessToken(user);

        return new AuthenticateUserResponse()
        {
            RefreshToken = newRefreshToken.Token,
            AccessToken = jwt.Token,
            Successful = true
        };
    }
    
    private static AuthenticateUserResponse FailAuthentication()
    {
        return new AuthenticateUserResponse()
        {
            Successful = false
        };
    }
}