using AutoMapper;

using Application.Requests.Commands.Event;
using Application.Responses;
using Core.Entities;

namespace Application.MappingProfiles;

public class EventProfile : Profile
{
    public EventProfile()
    {
        CreateMap<Event, EventResponse>();
        CreateMap<CreateEvent, Event>();
        CreateMap<UpdateEvent, Event>();
    }
}