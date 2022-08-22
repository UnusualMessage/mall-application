using MediatR;

using Microsoft.Extensions.DependencyInjection;

using Application.Handlers.CommandHandlers.ShopHandlers;
using Application.Requests.Commands.Shop;
using Application.Responses;

namespace Application.Handlers.CommandHandlers.Extensions;

public static class ShopCommandHandlersConfiguration
{
    public static void AddShopCommandHandlers(this IServiceCollection services)
    {
        services.AddScoped<IRequestHandler<CreateShop, ShopResponse?>, CreateShopHandler>();
        services.AddScoped<IRequestHandler<UpdateShop, ShopResponse?>, UpdateShopHandler>();
        services.AddScoped<IRequestHandler<DeleteShop, ShopResponse?>, DeleteShopHandler>();
    }
}