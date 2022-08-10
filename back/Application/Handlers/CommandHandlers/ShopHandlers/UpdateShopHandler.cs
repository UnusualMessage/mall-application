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
    private readonly IFileService _fileService;

    public UpdateShopHandler(IShopRepository repository, IMapper mapper, IFileService fileService)
    {
        _shopRepository = repository;
        _mapper = mapper;
        _fileService = fileService;
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

        var newShop = _mapper.Map<Shop>(request);
        newShop.LogoPath = await _fileService.UploadFile(request.Image, request.Destination!);
        
        return _mapper.Map<ShopResponse>(await _shopRepository.UpdateAsync(_mapper.Map<Shop>(request)));
    }
}