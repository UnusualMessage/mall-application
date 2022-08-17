using Application.Handlers.QueryHandlers.ShopHandlers;
using MediatR;

using Microsoft.Extensions.DependencyInjection;

using Application.Requests.Queries.Shop;
using Application.Responses;

namespace Application.Handlers.QueryHandlers.Extensions;

public static class ShopQueryHandlersConfiguration
{
    public static void AddShopQueryHandlers(this IServiceCollection services)
    {
        services.AddScoped<IRequestHandler<GetSievedShops, IEnumerable<ShopResponse>>, GetSievedShopsHandler>();
        services.AddScoped<IRequestHandler<GetShopById, ShopResponse>, GetShopByIdHandler>();
    }
}