using Application.Handlers.QueryHandlers.ImageHandlers;
using Application.Requests.Queries.Image;
using Application.Responses;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Handlers.QueryHandlers.Extensions;

public static class ImageQueryHandlersConfiguration
{
    public static void AddImageQueryHandlers(this IServiceCollection services)
    {
        services.AddScoped<IRequestHandler<GetSievedImages, IEnumerable<ImageResponse>>, GetSievedImagesHandler>();
    }
}