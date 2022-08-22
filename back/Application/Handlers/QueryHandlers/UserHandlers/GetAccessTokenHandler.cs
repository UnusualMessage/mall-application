using Application.Requests.Queries.User;
using Application.Responses.User;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using MediatR;

namespace Application.Handlers.QueryHandlers.UserHandlers;

public class GetAccessTokenHandler : IRequestHandler<GetAccessToken, AuthenticateUserResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;

    public GetAccessTokenHandler(IUserRepository userRepository, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
    }
    
    public async Task<AuthenticateUserResponse> Handle(GetAccessToken request, CancellationToken cancellationToken)
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
        
        var jwt = _tokenService.GetGeneratedAccessToken(user);

        return new AuthenticateUserResponse()
        {
            RefreshToken = request.RefreshToken,
            AccessToken = jwt.Token,
            Successful = true
        };
    }
}