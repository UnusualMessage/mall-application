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
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;

    public CreateShopHandler(IShopRepository repository, ICategoryRepository categoryRepository, IMapper mapper)
    {
        _categoryRepository = categoryRepository;
        _shopRepository = repository;
        _mapper = mapper;
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
        
        return _mapper.Map<ShopResponse>(await _shopRepository.AddAsync(newShop));
    }
}