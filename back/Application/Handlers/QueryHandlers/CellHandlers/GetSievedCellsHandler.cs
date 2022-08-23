using Application.MappingProfiles;
using Application.Requests.Queries.Cell;
using Application.Responses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces.Repositories;
using MediatR;
using Sieve.Services;

namespace Application.Handlers.QueryHandlers.CellHandlers;

public class GetSievedCellsHandler : IRequestHandler<GetSievedCells, IEnumerable<CellResponse>>
{
    private readonly ICellRepository _cellRepository;
    private readonly ISieveProcessor _processor;

    public GetSievedCellsHandler(ICellRepository repository, ISieveProcessor processor)
    {
        _cellRepository = repository;
        _processor = processor;
    }
    
    public async Task<IEnumerable<CellResponse>> Handle(GetSievedCells request, CancellationToken cancellationToken)
    {
        var result = await _cellRepository.GetAllAsync();

        MapperConfiguration configuration = new(cfg => {
            cfg.AddProfile(new ShopProfile());
            cfg.AddProfile(new CategoryProfile());
            cfg.AddProfile(new ImageProfile());
            cfg.AddProfile(new SocialProfile());
            cfg.AddProfile(new CellProfile());
        });

        var response = result.AsQueryable().ProjectTo<CellResponse>(configuration);

        return _processor.Apply(request.SieveModel, response).AsEnumerable();
    }
}