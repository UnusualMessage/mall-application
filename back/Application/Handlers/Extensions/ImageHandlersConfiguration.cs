using Application.Handlers.CommandHandlers.Extensions;
using Application.Handlers.QueryHandlers.Extensions;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Handlers.Extensions;

public static class ImageHandlersConfiguration
{
    public static void AddImageHandlers(this IServiceCollection services)
    {
        services.AddImageCommandHandlers();
        services.AddImageQueryHandlers();
    }
}