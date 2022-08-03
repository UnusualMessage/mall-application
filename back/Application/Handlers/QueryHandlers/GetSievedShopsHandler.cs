using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Sieve.Services;

using Application.Requests.Queries;
using Application.Responses;
using Application.MappingProfiles;

using Core.Interfaces.Repositories;

namespace Application.Handlers.QueryHandlers;

public class GetSievedShopsHandler : IRequestHandler<GetSievedShops, IEnumerable<ShopResponse>>
{
    private readonly IShopRepository _shopRepository;
    private readonly ISieveProcessor _processor;

    public GetSievedShopsHandler(IShopRepository repository, ISieveProcessor processor)
    {
        _shopRepository = repository;
        _processor = processor;
    }
    
    public async Task<IEnumerable<ShopResponse>> Handle(GetSievedShops request, CancellationToken cancellationToken)
    {
        var result = await _shopRepository.GetAllAsync();

        MapperConfiguration configuration = new(cfg => {
            cfg.AddProfile(new ShopProfile());
        });

        var response = result.AsQueryable().ProjectTo<ShopResponse>(configuration);

        return _processor.Apply(request.SieveModel, response).AsEnumerable();
    }
}