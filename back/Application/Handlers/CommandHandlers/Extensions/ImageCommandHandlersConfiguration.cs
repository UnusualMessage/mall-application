using Application.Handlers.CommandHandlers.ImageHandlers;
using Application.Requests.Commands.Image;
using Application.Responses;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Handlers.CommandHandlers.Extensions;

public static class ImageCommandHandlersConfiguration
{
    public static void AddImageCommandHandlers(this IServiceCollection services)
    {
        services.AddScoped<IRequestHandler<CreateImage, ImageResponse>, CreateImageHandler>();
        services.AddScoped<IRequestHandler<DeleteImage, ImageResponse>, DeleteImageHandler>();
    }
}