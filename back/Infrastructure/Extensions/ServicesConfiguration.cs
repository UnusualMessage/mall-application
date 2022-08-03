using Core.Interfaces.Services;

using Infrastructure.Services;

using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Extensions;

public static class ServicesConfiguration
{
    public static void AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddSingleton<IFileService, FileService>();
    }
}