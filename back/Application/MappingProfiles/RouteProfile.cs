using Application.Responses;
using AutoMapper;
using Core.Entities;

namespace Application.MappingProfiles;

public class RouteProfile : Profile
{
    public RouteProfile()
    {
        CreateMap<Route, RouteResponse>();
    }
}