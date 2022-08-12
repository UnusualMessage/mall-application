using Microsoft.Extensions.DependencyInjection;

using Application.MappingProfiles;

namespace Application.Extensions;

public static class MappingProfilesConfiguration
{
    public static void AddMappingProfiles(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(CategoryProfile));
        services.AddAutoMapper(typeof(UserProfile));

        services.AddAutoMapper(typeof(ShopProfile));
        services.AddAutoMapper(typeof(EventProfile));
        services.AddAutoMapper(typeof(DiscountProfile));

        services.AddAutoMapper(typeof(ContactsProfile));
        services.AddAutoMapper(typeof(RouteProfile));
        services.AddAutoMapper(typeof(BreadcrumbProfile));
    }
}