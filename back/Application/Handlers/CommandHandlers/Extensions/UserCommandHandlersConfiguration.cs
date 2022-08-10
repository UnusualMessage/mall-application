using MediatR;

using Microsoft.Extensions.DependencyInjection;

using Application.Handlers.CommandHandlers.UserHandlers;
using Application.Requests.Commands.User;
using Application.Responses.User;

namespace Application.Handlers.CommandHandlers.Extensions;

public static class UserCommandHandlersConfiguration
{
    public static void AddUserCommandHandlers(this IServiceCollection services)
    {
        services.AddScoped<IRequestHandler<AuthenticateUser, AuthenticateUserResponse>, AuthenticateUserHandler>();
        services.AddScoped<IRequestHandler<RefreshUser, AuthenticateUserResponse>, RefreshUserHandler>();
        services.AddScoped<IRequestHandler<RegisterUser, AuthenticateUserResponse>, RegisterUserHandler>();
        services.AddScoped<IRequestHandler<RevokeUser, RevokeUserResponse>, RevokeUserHandler>();
    }
}