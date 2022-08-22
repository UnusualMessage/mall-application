using MediatR;
using AutoMapper;

using Application.Requests.Commands.Discount;
using Application.Responses;
using Core.Entities;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.DiscountHandlers;

public class CreateDiscountHandler : IRequestHandler<CreateDiscount, DiscountResponse?>
{
    private readonly IDiscountRepository _discountRepository;
    private readonly IRouteRepository _routeRepository;
    private readonly IBreadcrumbRepository _breadcrumbRepository;
    private readonly IMapper _mapper;

    public CreateDiscountHandler(IDiscountRepository repository, IRouteRepository routeRepository, 
        IBreadcrumbRepository breadcrumbRepository, IMapper mapper)
    {
        _discountRepository = repository;
        _routeRepository = routeRepository;
        _breadcrumbRepository = breadcrumbRepository;
        _mapper = mapper;
    }
    
    public async Task<DiscountResponse?> Handle(CreateDiscount request, CancellationToken cancellationToken)
    {
        var newDiscount = _mapper.Map<Discount>(request);
        
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
        
        newDiscount.RouteId = route.Id;
        newDiscount.BreadcrumbId = breadcrumb.Id;
        newDiscount.Id = id;
        
        return _mapper.Map<DiscountResponse>(await _discountRepository.AddAsync(newDiscount));
    }
}