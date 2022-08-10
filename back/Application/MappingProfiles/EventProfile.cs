using AutoMapper;

using Application.Requests.Commands.Event;
using Application.Responses;
using Core.Entities;

namespace Application.MappingProfiles;

public class EventProfile : Profile
{
    public EventProfile()
    {
        CreateMap<Event, EventResponse>()
            .ForMember(dest => dest.RoutePath, opt => opt.MapFrom(src => src.Route.Path))
            .ForMember(dest => dest.Link, opt => opt.MapFrom(src => src.Breadcrumb.Link));
        
        CreateMap<CreateEvent, Event>();
        CreateMap<UpdateEvent, Event>();
    }
}