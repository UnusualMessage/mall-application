using Application.Handlers.QueryHandlers.Extensions;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Handlers.Extensions;

public static class BreadcrumbHandlersConfiguration
{
    public static void AddBreadcrumbHandlers(this IServiceCollection services)
    {
        services.AddBreadcrumbQueryHandlers();
    }
}