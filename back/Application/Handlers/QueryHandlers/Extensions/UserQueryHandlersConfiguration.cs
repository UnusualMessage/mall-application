using Application.Handlers.QueryHandlers.UserHandlers;
using Application.Requests.Queries.User;
using Application.Responses.User;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Handlers.QueryHandlers.Extensions;

public static class UserQueryHandlersConfiguration
{
    public static void AddUserQueryHandlers(this IServiceCollection services)
    {
        services
            .AddScoped<IRequestHandler<GetAccessToken, AuthenticateUserResponse>, GetAccessTokenHandler>();
    }
}