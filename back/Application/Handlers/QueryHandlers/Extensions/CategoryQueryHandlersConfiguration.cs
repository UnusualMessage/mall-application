using Application.Handlers.QueryHandlers.CategoryHandlers;
using MediatR;

using Microsoft.Extensions.DependencyInjection;

using Application.Requests.Queries.Category;
using Application.Responses;

namespace Application.Handlers.QueryHandlers.Extensions;

public static class CategoryQueryHandlersConfiguration
{
    public static void AddCategoryQueryHandlers(this IServiceCollection services)
    {
        services.AddScoped<IRequestHandler<GetSievedCategories, IEnumerable<CategoryResponse>>, 
            GetSievedCategoriesHandler>();
        
        services.AddScoped<IRequestHandler<GetCategoryById, CategoryResponse>, 
            GetCategoryByIdHandler>();
    }
}