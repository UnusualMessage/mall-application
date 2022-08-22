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
    private readonly IPasswordHasher _passwordHasher;

    public RegisterUserHandler(IUserRepository userRepository, IMapper mapper, ITokenService tokenService, 
        IPasswordHasher hasher)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _tokenService = tokenService;
        _passwordHasher = hasher;
    }

    public async Task<AuthenticateUserResponse> Handle(RegisterUser request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserByLoginAsync(request.Login);

        if (user is not null)
        {
            return FailRegistration();
        }

        var newUser = _mapper.Map<User>(request);
        var refreshToken = _tokenService.GetGeneratedRefreshToken(request.IpAddress ?? "");

        newUser.RefreshTokens.Add(refreshToken);
        newUser.Password = _passwordHasher.HashPassword(request.Password);

        user = await _userRepository.AddAsync(newUser);

        if (user is null)
        {
            return FailRegistration();
        }

        return new AuthenticateUserResponse()
        {
            RefreshToken = refreshToken.Token,
            AccessToken = _tokenService.GetGeneratedAccessToken(user).Token,
            Successful = true,
        };
    }
    
    private static AuthenticateUserResponse FailRegistration()
    {
        return new AuthenticateUserResponse()
        {
            Successful = false
        };
    }
}