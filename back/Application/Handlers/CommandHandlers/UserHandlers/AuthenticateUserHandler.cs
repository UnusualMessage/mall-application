using MediatR;
using AutoMapper;

using Application.Requests.Commands.User;
using Application.Responses.User;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;

namespace Application.Handlers.CommandHandlers.UserHandlers;

public class AuthenticateUserHandler : IRequestHandler<AuthenticateUser, AuthenticateUserResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly ITokenService _tokenService;

    public AuthenticateUserHandler(IUserRepository repository, IMapper mapper, ITokenService service)
    {
        _userRepository = repository;
        _mapper = mapper;
        _tokenService = service;
    }
    
    public async Task<AuthenticateUserResponse> Handle(AuthenticateUser request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserByLoginAsync(request.Login ?? "");

        var passwordInvalid = user?.Password != request.Password;

        AuthenticateUserResponse response = new();

        if (user == null || passwordInvalid)
        {
            response.Successful = false;
            return response;
        }

        var refreshToken = _tokenService.GetGeneratedRefreshToken(request.IpAddress ?? "");
        user.RefreshTokens.Add(refreshToken);

        await _userRepository.UpdateAsync(user);

        response = _mapper.Map<AuthenticateUserResponse>(user);
        response.RefreshToken = refreshToken.Token;
        response.AccessToken = _tokenService.GetGeneratedAccessToken(user).Token;
        response.Successful = true;

        return response;
    }
}