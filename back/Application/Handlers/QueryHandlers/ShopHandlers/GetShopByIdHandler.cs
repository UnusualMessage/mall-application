using Application.Requests.Queries.Shop;
using Application.Responses;
using AutoMapper;
using Core.Interfaces.Repositories;
using MediatR;

namespace Application.Handlers.QueryHandlers.ShopHandlers;

public class GetShopByIdHandler : IRequestHandler<GetShopById, ShopResponse>
{
    private readonly IShopRepository _shopRepository;
    private readonly IMapper _mapper;

    public GetShopByIdHandler(IShopRepository repository, IMapper mapper)
    {
        _shopRepository = repository;
        _mapper = mapper;
    }
    
    public async Task<ShopResponse> Handle(GetShopById request, CancellationToken cancellationToken)
    {
        return _mapper.Map<ShopResponse>(await _shopRepository.GetByIdAsync(request.Id));
    }
}