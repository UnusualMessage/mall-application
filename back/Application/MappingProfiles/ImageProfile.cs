using Application.Responses;
using AutoMapper;
using Core.Entities;

namespace Application.MappingProfiles;

public class ImageProfile : Profile
{
    public ImageProfile()
    {
        CreateMap<Image, ImageResponse>();
    }
}