using Core.Interfaces.Repositories;

using Infrastructure.Context;
using Infrastructure.Repositories;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Extensions;

public static class DatabaseConfiguration
{
    public static void AddPostgresql(this IServiceCollection services, IConfiguration configuration)
    {
        var connection = configuration["ConnectionStrings:Connection"];
        services.AddDbContext<ApplicationContext>(options => options.UseNpgsql(connection));
    }

    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IContactsRepository, ContactsRepository>();
        services.AddScoped<IRouteRepository, RouteRepository>();
        
        services.AddScoped<IShopRepository, ShopRepository>();
        services.AddScoped<IEventRepository, EventRepository>();
        services.AddScoped<IDiscountRepository, DiscountRepository>();

        services.AddScoped<ICategoryRepository, CategoryRepository>();
        
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
    }

}