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
    private readonly IRouteRepository _routeRepository;
    private readonly IBreadcrumbRepository _breadcrumbRepository;
    private readonly IMapper _mapper;

    public CreateShopHandler(IShopRepository repository, ICategoryRepository categoryRepository, IMapper mapper, 
        IRouteRepository routeRepository, IBreadcrumbRepository breadcrumbRepository)
    {
        _categoryRepository = categoryRepository;
        _shopRepository = repository;
        _mapper = mapper;
        _routeRepository = routeRepository;
        _breadcrumbRepository = breadcrumbRepository;
    }
    
    public async Task<ShopResponse> Handle(CreateShop request, CancellationToken cancellationToken)
    {
        var newShop = _mapper.Map<Shop>(request);

        var id = Guid.NewGuid();
        var route = await _routeRepository.AddAsync(new Route()
            {
                Path = $"{request.RoutePath}/{id}"  
            }
        );

        var breadcrumb = await _breadcrumbRepository.AddAsync(new Breadcrumb()
            {
                Name = request.Title,
                Link = request.Link
            }
        );
        
        if (route is null || breadcrumb is null)
        {
            return null;
        }

        newShop.RouteId = route.Id;
        newShop.BreadcrumbId = breadcrumb.Id;
        newShop.Id = id;
        
        return _mapper.Map<ShopResponse>(await _shopRepository.AddAsync(newShop));
    }
}