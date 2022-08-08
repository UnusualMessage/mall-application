using Application.Handlers.QueryHandlers.Extensions;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Handlers.Extensions;

public static class RouteHandlersConfiguration
{
    public static void AddRouteHandlers(this IServiceCollection services)
    {
        services.AddRouteQueryHandlers();
    }
}