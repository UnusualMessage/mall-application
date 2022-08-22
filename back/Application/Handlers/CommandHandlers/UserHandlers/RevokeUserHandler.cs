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

        if (user is null)
        {
            return FailRevoke();
        }

        var refreshToken = user.RefreshTokens.Single(x => x.Token == request.RefreshToken);

        if (refreshToken.IsActive == false)
        {
            return FailRevoke();
        }

        refreshToken.Revoked = DateTime.UtcNow;
        refreshToken.RevokedByIp = request.IpAddress;

        await _userRepository.UpdateAsync(user);

        return new RevokeUserResponse()
        {
            Revoked = true
        };
    }

    private RevokeUserResponse FailRevoke()
    {
        return new RevokeUserResponse()
        {
            Revoked = false
        };
    }
}