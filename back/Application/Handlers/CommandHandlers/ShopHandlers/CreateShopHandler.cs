using MediatR;
using AutoMapper;

using Application.Requests.Commands.Shop;
using Application.Responses;
using Core.Entities;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.ShopHandlers;

public class CreateShopHandler : IRequestHandler<CreateShop, ShopResponse?>
{
    private readonly IShopRepository _shopRepository;
    private readonly IImageRepository _imageRepository;
    private readonly IMapper _mapper;

    public CreateShopHandler(IShopRepository repository, IMapper mapper, IImageRepository imageRepository)
    {
        _shopRepository = repository;
        _mapper = mapper;
        _imageRepository = imageRepository;
    }
    
    public async Task<ShopResponse?> Handle(CreateShop request, CancellationToken cancellationToken)
    {
        var newShop = _mapper.Map<Shop>(request);
        
        var id = Guid.NewGuid();
        newShop.Id = id;
        
        newShop.Route = new Route()
        {
            Path = $"{request.RoutePath}/{id}"
        };

        newShop.Breadcrumb = new Breadcrumb()
        {
            Name = request.Title,
            Link = request.Link
        };

        foreach (var imageId in request.GalleryIds)
        {
            var image = await _imageRepository.GetByIdAsync(imageId);

            if (image != null)
            {
                newShop.Gallery.Add(image);
            }
        }
        
        return _mapper.Map<ShopResponse>(await _shopRepository.AddAsync(newShop));
    }
}