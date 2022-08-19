using MediatR;
using AutoMapper;

using Application.Requests.Commands.Shop;
using Application.Responses;
using Core.Entities;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;

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
        var shopToBeUpdated = await _shopRepository.GetByIdAsync(request.Id);
        shopToBeUpdated?.Route?.Update(new Route()
        {
            Path = request.RoutePath
        });
        
        shopToBeUpdated?.Breadcrumb?.Update(new Breadcrumb()
        {
            Name = request.Title,
            Link = request.Link
        });

        foreach (var social in shopToBeUpdated.Socials)
        {
            foreach (var newSocial in _mapper.Map<IEnumerable<Social>>(request.Socials))
            {
                if (social.Id != newSocial.Id)
                {
                    continue;
                }
                
                social.Update(newSocial);
                break;
            }
        }

        return _mapper.Map<ShopResponse>(await _shopRepository.UpdateAsync(_mapper.Map<Shop>(request)));
    }
}