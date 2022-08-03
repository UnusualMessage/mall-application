using Application.Handlers.CommandHandlers.Extensions;
using Microsoft.Extensions.DependencyInjection;

using Application.Handlers.QueryHandlers.Extensions;

namespace Application.Handlers.Extensions;

public static class CategoriesHandlersConfiguration
{
    public static void AddCategoriesHandlers(this IServiceCollection services)
    {
        services.AddCategoryQueryHandlers();
        services.AddCategoryCommandHandlers();
    }
}