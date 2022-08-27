using Application.Requests.Queries.Shop;
using Application.Responses;
using AutoMapper;
using Core.Exceptions;
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
        var shop = await _shopRepository.GetByIdAsync(request.Id);

        if (shop is null)
        {
            throw new NotFoundException("Не удалось найти статью!");
        }
        
        return _mapper.Map<ShopResponse>(shop);
    }
}