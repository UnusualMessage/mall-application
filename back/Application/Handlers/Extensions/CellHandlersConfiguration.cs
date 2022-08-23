using Application.Handlers.QueryHandlers.Extensions;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Handlers.Extensions;

public static class CellHandlersConfiguration
{
    public static void AddCellHandlers(this IServiceCollection services)
    {
        services.AddCellQueryHandlers();
    }
}