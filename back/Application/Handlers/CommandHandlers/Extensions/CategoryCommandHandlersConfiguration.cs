using MediatR;

using Microsoft.Extensions.DependencyInjection;

using Application.Handlers.CommandHandlers.CategoryHandlers;
using Application.Requests.Commands.Category;
using Application.Responses;

namespace Application.Handlers.CommandHandlers.Extensions;

public static class CategoryCommandHandlersConfiguration
{
    public static void AddCategoryCommandHandlers(this IServiceCollection services)
    {
        services.AddScoped<IRequestHandler<CreateCategory, CategoryResponse>, CreateCategoryHandler>();
        services.AddScoped<IRequestHandler<UpdateCategory, CategoryResponse>, UpdateCategoryHandler>();
        services.AddScoped<IRequestHandler<DeleteCategory, CategoryResponse>, DeleteCategoryHandler>();
    }
}