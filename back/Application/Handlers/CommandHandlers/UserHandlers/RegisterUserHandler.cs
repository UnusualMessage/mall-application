using MediatR;
using AutoMapper;

using Application.Requests.Commands.User;
using Application.Responses.User;
using Core.Entities;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;

namespace Application.Handlers.CommandHandlers.UserHandlers;

public class RegisterUserHandler : IRequestHandler<RegisterUser, AuthenticateUserResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly ITokenService _tokenService;

    public RegisterUserHandler(IUserRepository userRepository, IMapper mapper, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _tokenService = tokenService;
    }

    public async Task<AuthenticateUserResponse> Handle(RegisterUser request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserByLoginAsync(request.Login ?? "");

        AuthenticateUserResponse response = new();

        if (user is not null)
        {
            response.Successful = false;
            return response;
        }

        var newUser = _mapper.Map<User>(request);
        var refreshToken = _tokenService.GetGeneratedRefreshToken(request.IpAddress ?? "");

        newUser.RefreshTokens.Add(refreshToken);

        user = await _userRepository.AddAsync(newUser);

        if (user is null)
        {
            response.Successful = false;
            return response;
        }
        
        response = _mapper.Map<AuthenticateUserResponse>(newUser);

        response.RefreshToken = refreshToken.Token;
        response.AccessToken = _tokenService.GetGeneratedAccessToken(user).Token;
        response.Successful = true;

        return response;
    }
}