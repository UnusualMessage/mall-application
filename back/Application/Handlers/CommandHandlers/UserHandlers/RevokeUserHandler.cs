using MediatR;

using Application.Requests.Commands.User;
using Application.Responses.User;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.UserHandlers;

public class RevokeUserHandler : IRequestHandler<RevokeUser, RevokeUserResponse>
{
    private readonly IUserRepository _userRepository;

    public RevokeUserHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<RevokeUserResponse> Handle(RevokeUser request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserByTokenAsync(request.RefreshToken ?? "");

        RevokeUserResponse response = new();
        
        if (user is null)
        {
            response.Revoked = false;
            return response;
        }

        var refreshToken = user.RefreshTokens.Single(x => x.Token == request.RefreshToken);

        if (refreshToken.IsActive == false)
        {
            response.Revoked = false;
            return response;
        }

        refreshToken.Revoked = DateTime.UtcNow;
        refreshToken.RevokedByIp = request.IpAddress;

        _ = await _userRepository.UpdateAsync(user);

        response.Revoked = true;
        return response;
    }
}