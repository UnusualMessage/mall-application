using AutoMapper;

using Application.Requests.Commands.Discount;
using Application.Responses;
using Core.Entities;

namespace Application.MappingProfiles;

public class DiscountProfile : Profile
{
    public DiscountProfile()
    {
        CreateMap<Discount, DiscountResponse>()
            .ForMember(dest => dest.RoutePath, opt => opt.MapFrom(src => src.Route.Path))
            .ForMember(dest => dest.Link, opt => opt.MapFrom(src => src.Breadcrumb.Link));
        
        CreateMap<CreateDiscount, Discount>();
        CreateMap<UpdateDiscount, Discount>();
    }
}