using Application.Responses;
using AutoMapper;
using Core.Entities;

namespace Application.MappingProfiles;

public class BreadcrumbProfile : Profile
{
    public BreadcrumbProfile()
    {
        CreateMap<Breadcrumb, BreadcrumbResponse>();
    }
}