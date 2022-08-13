using Microsoft.Extensions.DependencyInjection;

using Application.Handlers.Extensions;

namespace Application.Extensions;

public static class HandlersConfiguration
{
    public static void AddHandlers(this IServiceCollection services)
    {
        services.AddCategoriesHandlers();
        services.AddContactsHandlers();
        services.AddShopHandlers();
        services.AddEventHandlers();
        services.AddDiscountHandlers();
        services.AddUserHandlers();
        services.AddRouteHandlers();
        services.AddBreadcrumbHandlers();
        services.AddImageHandlers();
    }
}