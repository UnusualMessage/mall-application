using Microsoft.Extensions.DependencyInjection;

using Application.Handlers.CommandHandlers.Extensions;

namespace Application.Handlers.Extensions;

public static class UserHandlersConfiguration
{
    public static void AddUserHandlers(this IServiceCollection services)
    {
        services.AddUserCommandHandlers();
    }
}