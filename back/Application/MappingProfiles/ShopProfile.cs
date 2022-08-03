using AutoMapper;

using Application.Requests.Commands.Shop;
using Application.Responses;
using Core.Entities;

namespace Application.MappingProfiles;

public class ShopProfile : Profile
{
    public ShopProfile()
    {
        CreateMap<Shop, ShopResponse>();
        CreateMap<CreateShop, Shop>();
        CreateMap<UpdateShop, Shop>();
    }
}