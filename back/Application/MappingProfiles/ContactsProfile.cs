using AutoMapper;

using Application.Requests.Commands.Contacts;
using Application.Responses;
using Core.Entities;

namespace Application.MappingProfiles;

public class ContactsProfile : Profile
{
    public ContactsProfile()
    {
        CreateMap<Contacts, ContactsResponse>();
        CreateMap<UpdateContacts, Contacts>();
    }
}