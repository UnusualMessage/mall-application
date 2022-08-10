using Application.Requests.Queries;
using Application.Responses;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Handlers.QueryHandlers.Extensions;

public static class BreadcrumbQueryHandlersConfiguration
{
    public static void AddBreadcrumbQueryHandlers(this IServiceCollection services)
    {
        services
            .AddScoped<IRequestHandler<GetSievedBreadcrumbs, IEnumerable<BreadcrumbResponse>>, GetSievedBreadcrumbsHandler>();
    }
}