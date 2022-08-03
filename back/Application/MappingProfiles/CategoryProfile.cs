using AutoMapper;

using Application.Requests.Commands.Category;
using Application.Responses;
using Core.Entities;

namespace Application.MappingProfiles;

public class CategoryProfile : Profile
{
    public CategoryProfile()
    {
        CreateMap<Category, CategoryResponse>();
        CreateMap<CreateCategory, Category>();
        CreateMap<UpdateCategory, Category>();
    }
}