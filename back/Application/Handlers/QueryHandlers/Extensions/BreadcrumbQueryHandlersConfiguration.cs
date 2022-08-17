using Application.Handlers.QueryHandlers.BreadcrumbHandlers;
using Application.Requests.Queries.Breadcrumb;
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