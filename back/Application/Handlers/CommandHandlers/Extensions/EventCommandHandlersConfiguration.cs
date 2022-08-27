using MediatR;

using Microsoft.Extensions.DependencyInjection;

using Application.Handlers.CommandHandlers.EventHandlers;
using Application.Requests.Commands.Event;
using Application.Responses;

namespace Application.Handlers.CommandHandlers.Extensions;

public static class EventCommandHandlersConfiguration
{
    public static void AddEventCommandHandlers(this IServiceCollection services)
    {
        services.AddScoped<IRequestHandler<CreateEvent, EventResponse>, CreateEventHandler>();
        services.AddScoped<IRequestHandler<UpdateEvent, EventResponse>, UpdateEventHandler>();
        services.AddScoped<IRequestHandler<DeleteEvent, EventResponse>, DeleteEventHandler>();
    }
}