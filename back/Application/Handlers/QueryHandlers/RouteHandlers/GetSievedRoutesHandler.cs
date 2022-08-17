using Application.MappingProfiles;
using Application.Requests.Queries.Route;
using Application.Responses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces.Repositories;
using MediatR;
using Sieve.Services;

namespace Application.Handlers.QueryHandlers.RouteHandlers;

public class GetSievedRoutesHandler : IRequestHandler<GetSievedRoutes, IEnumerable<RouteResponse>>
{
    private readonly IRouteRepository _routeRepository;
    private readonly ISieveProcessor _processor;

    public GetSievedRoutesHandler(IRouteRepository repository, ISieveProcessor processor)
    {
        _routeRepository = repository;
        _processor = processor;
    }
    
    public async Task<IEnumerable<RouteResponse>> Handle(GetSievedRoutes request, CancellationToken cancellationToken)
    {
        var result = await _routeRepository.GetAllAsync();

        MapperConfiguration configuration = new(cfg =>
        {
            cfg.AddProfile(new RouteProfile());
        });

        
        var response = result.AsQueryable().ProjectTo<RouteResponse>(configuration);

        return _processor.Apply(request.SieveModel, response).AsEnumerable();
    }
}