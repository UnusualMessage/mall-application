using AutoMapper;

using Application.Requests.Commands.Discount;
using Application.Responses;
using Core.Entities;

namespace Application.MappingProfiles;

public class DiscountProfile : Profile
{
    public DiscountProfile()
    {
        CreateMap<Discount, DiscountResponse>();
        CreateMap<CreateDiscount, Discount>();
        CreateMap<UpdateDiscount, Discount>();
    }
}