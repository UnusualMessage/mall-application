using AutoMapper;

using Application.Requests.Commands.Shop;
using Application.Responses;
using Core.Entities;

namespace Application.MappingProfiles;

public class ShopProfile : Profile
{
    public ShopProfile()
    {
        CreateMap<Shop, ShopResponse>()
            .ForMember(dest => dest.RoutePath, opt => opt.MapFrom(src => src.Route.Path))
            .ForMember(dest => dest.Link, opt => opt.MapFrom(src => src.Breadcrumb.Link))
            .ForMember(dest => dest.Floor, opt => opt.MapFrom(src => src.Cell.Floor));
        
        CreateMap<CreateShop, Shop>();
        CreateMap<UpdateShop, Shop>();
    }
}