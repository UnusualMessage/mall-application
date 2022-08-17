using Application.Handlers.QueryHandlers.DiscountHandlers;
using MediatR;

using Microsoft.Extensions.DependencyInjection;

using Application.Requests.Queries.Discount;
using Application.Responses;

namespace Application.Handlers.QueryHandlers.Extensions;

public static class DiscountQueryHandlersConfiguration
{
    public static void AddDiscountQueryHandlers(this IServiceCollection services)
    {
        services
            .AddScoped<IRequestHandler<GetSievedDiscounts, IEnumerable<DiscountResponse>>, GetSievedDiscountsHandler>();
        
        services
            .AddScoped<IRequestHandler<GetDiscountById, DiscountResponse>, GetDiscountByIdHandler>();
    }
}