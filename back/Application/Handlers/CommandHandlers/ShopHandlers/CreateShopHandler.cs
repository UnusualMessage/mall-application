using MediatR;
using AutoMapper;

using Application.Requests.Commands.Shop;
using Application.Responses;
using Core.Entities;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.ShopHandlers;

public class CreateShopHandler : IRequestHandler<CreateShop, ShopResponse>
{
    private readonly IShopRepository _shopRepository;
    private readonly IMapper _mapper;

    public CreateShopHandler(IShopRepository repository, IMapper mapper)
    {
        _shopRepository = repository;
        _mapper = mapper;
    }
    
    public async Task<ShopResponse> Handle(CreateShop request, CancellationToken cancellationToken)
    {
        return _mapper.Map<ShopResponse>(await _shopRepository.AddAsync(_mapper.Map<Shop>(request)));
    }
}