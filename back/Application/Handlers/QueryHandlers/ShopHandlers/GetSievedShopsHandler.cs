using Application.MappingProfiles;
using Application.Requests.Queries.Shop;
using Application.Responses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces.Repositories;
using MediatR;
using Sieve.Services;

namespace Application.Handlers.QueryHandlers.ShopHandlers;

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
            cfg.AddProfile(new CategoryProfile());
            cfg.AddProfile(new ImageProfile());
            cfg.AddProfile(new SocialProfile());
        });

        var response = result.AsQueryable().ProjectTo<ShopResponse>(configuration);

        return _processor.Apply(request.SieveModel, response).AsEnumerable();
    }
}