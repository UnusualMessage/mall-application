using MediatR;
using AutoMapper;

using Application.Requests.Commands.Shop;
using Application.Responses;
using Core.Entities;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.ShopHandlers;

public class UpdateShopHandler : IRequestHandler<UpdateShop, ShopResponse>
{
    private readonly IShopRepository _shopRepository;
    private readonly IMapper _mapper;

    public UpdateShopHandler(IShopRepository repository, IMapper mapper)
    {
        _shopRepository = repository;
        _mapper = mapper;
    }

    public async Task<ShopResponse> Handle(UpdateShop request, CancellationToken cancellationToken)
    {
        return _mapper.Map<ShopResponse>(await _shopRepository.UpdateAsync(_mapper.Map<Shop>(request)));
    }
}