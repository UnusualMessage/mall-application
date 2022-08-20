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
        
        AuthenticateUserResponse response = new();

        if (user == null)
        {
            response.Successful = false;
            return response;
        }

        var refreshToken = user.RefreshTokens.Single(x => x.Token == request.RefreshToken);

        if (refreshToken.IsActive == false)
        {
            response.Successful = false;
            return response;
        }

        var newRefreshToken = _tokenService.GetGeneratedRefreshToken(request.IpAddress ?? "");

        refreshToken.Revoked = DateTime.UtcNow;
        refreshToken.RevokedByIp = request.IpAddress;
        refreshToken.ReplacedByToken = newRefreshToken.Token;
        user.RefreshTokens.Add(newRefreshToken);

        _ = await _userRepository.UpdateAsync(user);

        var jwt = _tokenService.GetGeneratedAccessToken(user);

        return new AuthenticateUserResponse()
        {
            Id = user.Id,
            RefreshToken = newRefreshToken.Token,
            AccessToken = jwt.Token,
            Successful = true
        };
    }
}