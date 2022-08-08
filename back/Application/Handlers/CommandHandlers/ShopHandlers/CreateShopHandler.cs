using MediatR;
using AutoMapper;

using Application.Requests.Commands.Shop;
using Application.Responses;
using Core.Entities;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;

namespace Application.Handlers.CommandHandlers.ShopHandlers;

public class CreateShopHandler : IRequestHandler<CreateShop, ShopResponse>
{
    private readonly IShopRepository _shopRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;
    private readonly IFileService _fileService;

    public CreateShopHandler(IShopRepository repository, ICategoryRepository categoryRepository, IMapper mapper, 
        IFileService fileService)
    {
        _categoryRepository = categoryRepository;
        _shopRepository = repository;
        _mapper = mapper;
        _fileService = fileService;
    }
    
    public async Task<ShopResponse> Handle(CreateShop request, CancellationToken cancellationToken)
    {
        ICollection<Category> categories = new List<Category>();
        
        foreach (var id in request.CategoryIds)
        {
            var category = await _categoryRepository.GetByIdAsync(id) ?? null;
            if (category is null)
            {
                continue;
            }
            
            categories.Add(category);
        }

        var newShop = _mapper.Map<Shop>(request);
        newShop.Categories = categories;
        newShop.Image = await _fileService.UploadFile(request.Image, request.Destination!);
        
        return _mapper.Map<ShopResponse>(await _shopRepository.AddAsync(newShop));
    }
}