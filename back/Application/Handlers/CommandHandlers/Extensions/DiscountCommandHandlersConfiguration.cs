using MediatR;

using Microsoft.Extensions.DependencyInjection;

using Application.Handlers.CommandHandlers.DiscountHandlers;
using Application.Requests.Commands.Discount;
using Application.Responses;

namespace Application.Handlers.CommandHandlers.Extensions;

public static class DiscountCommandHandlersConfiguration
{
    public static void AddDiscountCommandHandlers(this IServiceCollection services)
    {
        services.AddScoped<IRequestHandler<CreateDiscount, DiscountResponse?>, CreateDiscountHandler>();
        services.AddScoped<IRequestHandler<UpdateDiscount, DiscountResponse>, UpdateDiscountHandler>();
        services.AddScoped<IRequestHandler<DeleteDiscount, DiscountResponse?>, DeleteDiscountHandler>();
    }
}