using Application.Responses;
using AutoMapper;
using Core.Entities;

namespace Application.MappingProfiles;

public class CellProfile : Profile
{
    public CellProfile()
    {
        CreateMap<Cell, CellResponse>();
    }
}