using Application.Services;

using Core.Interfaces.Services;

using Microsoft.Extensions.DependencyInjection;

namespace Application.Extensions;

public static class ServicesConfiguration
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        services.AddSingleton<ITokenService, JwtService>();
    }
}