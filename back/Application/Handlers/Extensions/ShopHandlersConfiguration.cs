using Microsoft.Extensions.DependencyInjection;

using Application.Handlers.CommandHandlers.Extensions;
using Application.Handlers.QueryHandlers.Extensions;

namespace Application.Handlers.Extensions;

public static class ShopHandlersConfiguration
{
    public static void AddShopHandlers(this IServiceCollection services)
    {
        services.AddShopQueryHandlers();
        services.AddShopCommandHandlers();
    }
}