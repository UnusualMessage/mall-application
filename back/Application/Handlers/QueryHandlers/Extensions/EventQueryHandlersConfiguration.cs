using Application.Handlers.QueryHandlers.EventHandlers;
using MediatR;

using Microsoft.Extensions.DependencyInjection;

using Application.Requests.Queries.Event;
using Application.Responses;

namespace Application.Handlers.QueryHandlers.Extensions;

public static class EventQueryHandlersConfiguration
{
    public static void AddEventQueryHandlers(this IServiceCollection services)
    {
        services.AddScoped<IRequestHandler<GetSievedEvents, IEnumerable<EventResponse>>, GetSievedEventsHandler>();
        services.AddScoped<IRequestHandler<GetEventById, EventResponse>, GetEventByIdHandler>();
    }
}