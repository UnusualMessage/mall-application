using Application.Requests.Queries;
using Application.Responses;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Handlers.QueryHandlers.Extensions;

public static class RouteQueryHandlersConfiguration
{
    public static void AddRouteQueryHandlers(this IServiceCollection services)
    {
        services
            .AddScoped<IRequestHandler<GetSievedRoutes, IEnumerable<RouteResponse>>, GetSievedRoutesHandler>();
    }
}