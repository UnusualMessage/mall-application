using Sieve.Services;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

using Application.Extensions;
using Infrastructure.Extensions;

namespace API.Extensions;

public static class StartupConfiguration
{
    public static void ConfigureSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "VenevMall.API", Version = "v1" });

            c.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
            {
                Description = "JWT Authorization",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme,
                BearerFormat = "JWT"
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = JwtBearerDefaults.AuthenticationScheme
                        }
                    },
                    Array.Empty<string>()
                }
            });
        });
    }

    public static void ConfigureApplicationLayer(this IServiceCollection services)
    {
        services.AddApplicationServices();
        services.AddMappingProfiles();
        services.AddHandlers();

        services.AddTransient<ISieveProcessor, SieveProcessor>();
    }

    public static void ConfigureInfrastructureLayer(this IServiceCollection services)
    {
        services.AddRepositories();
        services.AddInfrastructureServices();
    }
}