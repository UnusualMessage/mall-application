using Microsoft.Extensions.DependencyInjection;

using Application.Handlers.CommandHandlers.Extensions;
using Application.Handlers.QueryHandlers.Extensions;

namespace Application.Handlers.Extensions;

public static class EventHandlersConfiguration
{
    public static void AddEventHandlers(this IServiceCollection services)
    {
        services.AddEventQueryHandlers();
        services.AddEventCommandHandlers();
    }
}