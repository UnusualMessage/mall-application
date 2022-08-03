using MediatR;
using AutoMapper;

using Application.Requests.Commands.Shop;
using Application.Responses;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.ShopHandlers;

public class DeleteShopHandler : IRequestHandler<DeleteShop, ShopResponse>
{
    private readonly IShopRepository _shopRepository;
    private readonly IMapper _mapper;

    public DeleteShopHandler(IShopRepository repository, IMapper mapper)
    {
        _shopRepository = repository;
        _mapper = mapper;
    }

    public async Task<ShopResponse> Handle(DeleteShop request, CancellationToken cancellationToken)
    {
        return _mapper.Map<ShopResponse>(await _shopRepository.DeleteByIdAsync(request.Id));
    }
}
