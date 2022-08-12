using Application.Requests.Commands.User;
using Application.Responses.User;
using AutoMapper;
using Core.Entities;

namespace Application.MappingProfiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, AuthenticateUserResponse>();
        CreateMap<RegisterUser, User>();
        CreateMap<AuthenticateUser, User>();
    }
}