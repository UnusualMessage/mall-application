using Microsoft.Extensions.DependencyInjection;

using Application.Handlers.CommandHandlers.Extensions;
using Application.Handlers.QueryHandlers.Extensions;

namespace Application.Handlers.Extensions;

public static class DiscountHandlersConfiguration
{
    public static void AddDiscountHandlers(this IServiceCollection services)
    {
        services.AddDiscountQueryHandlers();
        services.AddDiscountCommandHandlers();
    }
}