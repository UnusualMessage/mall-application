using MediatR;

using Microsoft.Extensions.DependencyInjection;

using Application.Requests.Queries;
using Application.Responses;

namespace Application.Handlers.QueryHandlers.Extensions;

public static class ShopQueryHandlersConfiguration
{
    public static void AddShopQueryHandlers(this IServiceCollection services)
    {
        services.AddScoped<IRequestHandler<GetSievedShops, IEnumerable<ShopResponse>>, GetSievedShopsHandler>();
    }
}