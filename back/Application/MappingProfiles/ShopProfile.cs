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
            .ForMember(dest => dest.RouteName, 
                opt => opt.MapFrom(src => src.Route.Path));
        
        CreateMap<CreateShop, Shop>();
        CreateMap<UpdateShop, Shop>();
    }
}