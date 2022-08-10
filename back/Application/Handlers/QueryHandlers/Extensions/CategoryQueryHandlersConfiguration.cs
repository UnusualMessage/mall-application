using MediatR;

using Microsoft.Extensions.DependencyInjection;

using Application.Requests.Queries;
using Application.Responses;

namespace Application.Handlers.QueryHandlers.Extensions;

public static class CategoryQueryHandlersConfiguration
{
    public static void AddCategoryQueryHandlers(this IServiceCollection services)
    {
        services.AddScoped<IRequestHandler<GetSievedCategories, IEnumerable<CategoryResponse>>, 
            GetSievedCategoriesHandler>();
    }
}