using Application.Requests.Commands.Social;
using Application.Responses;
using Application.Responses.User;
using AutoMapper;
using Core.Entities;

namespace Application.MappingProfiles;

public class SocialProfile : Profile
{
    public SocialProfile()
    {
        CreateMap<CreateSocial, Social>();
        CreateMap<Social, SocialResponse>();
        CreateMap<UpdateSocial, Social>();
    }
}