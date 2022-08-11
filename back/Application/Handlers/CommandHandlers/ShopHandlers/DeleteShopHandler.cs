﻿using MediatR;
using AutoMapper;

using Application.Requests.Commands.Shop;
using Application.Responses;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.ShopHandlers;

public class DeleteShopHandler : IRequestHandler<DeleteShop, ShopResponse>
{
    private readonly IShopRepository _shopRepository;
    private readonly IRouteRepository _routeRepository;
    private readonly IBreadcrumbRepository _breadcrumbRepository;
    private readonly IMapper _mapper;

    public DeleteShopHandler(IShopRepository repository, IRouteRepository routeRepository, 
        IBreadcrumbRepository breadcrumbRepository, IMapper mapper)
    {
        _shopRepository = repository;
        _breadcrumbRepository = breadcrumbRepository;
        _routeRepository = routeRepository;
        _mapper = mapper;
    }

    public async Task<ShopResponse> Handle(DeleteShop request, CancellationToken cancellationToken)
    {
        var removedShop = await _shopRepository.DeleteByIdAsync(request.Id);

        var routeId = removedShop.RouteId;
        var breadcrumbId = removedShop.BreadcrumbId;

        await _routeRepository.DeleteByIdAsync(routeId);
        await _breadcrumbRepository.DeleteByIdAsync(breadcrumbId);

        return _mapper.Map<ShopResponse>(removedShop);
    }
}
