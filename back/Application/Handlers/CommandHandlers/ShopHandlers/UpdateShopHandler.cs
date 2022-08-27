using MediatR;
using AutoMapper;

using Application.Requests.Commands.Shop;
using Application.Responses;
using Core.Entities;
using Core.Exceptions;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.ShopHandlers;

public class UpdateShopHandler : IRequestHandler<UpdateShop, ShopResponse>
{
    private readonly IShopRepository _shopRepository;
    private readonly IImageRepository _imageRepository;
    private readonly IMapper _mapper;

    public UpdateShopHandler(IShopRepository repository, IImageRepository imageRepository, IMapper mapper)
    {
        _imageRepository = imageRepository;
        _shopRepository = repository;
        _mapper = mapper;
    }

    public async Task<ShopResponse> Handle(UpdateShop request, CancellationToken cancellationToken)
    {
        var shopToBeUpdated = await _shopRepository.GetByIdAsync(request.Id);

        if (shopToBeUpdated is null)
        {
            throw new NotFoundException("Не удалось найти статью!");
        }
        
        shopToBeUpdated.Route?.Update(new Route()
        {
            Path = request.RoutePath
        });
        
        shopToBeUpdated.Breadcrumb?.Update(new Breadcrumb()
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
        
        foreach (var imageId in request.GalleryIds)
        {
            shopToBeUpdated.Gallery.Clear();
            
            var image = await _imageRepository.GetByIdAsync(imageId);

            if (image != null)
            {
                shopToBeUpdated.Gallery.Add(image);
            }
        }

        try
        {
            return _mapper.Map<ShopResponse>(await _shopRepository.UpdateAsync(_mapper.Map<Shop>(request)));
        }
        catch (InvalidOperationException)
        {
            throw new BadRequestException("Не удалось обновить статью!");
        }
    }
}