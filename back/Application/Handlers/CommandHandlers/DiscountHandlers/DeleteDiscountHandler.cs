using AutoMapper;
using MediatR;

using Application.Requests.Commands.Discount;
using Application.Responses;
using Core.Entities;
using Core.Exceptions;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.DiscountHandlers;

public class DeleteDiscountHandler : IRequestHandler<DeleteDiscount, DiscountResponse>
{
    private readonly IDiscountRepository _discountRepository;
    private readonly IRouteRepository _routeRepository;
    private readonly IBreadcrumbRepository _breadcrumbRepository;
    private readonly IMapper _mapper;

    public DeleteDiscountHandler(IDiscountRepository repository, IRouteRepository routeRepository, 
        IBreadcrumbRepository breadcrumbRepository, IMapper mapper)
    {
        _discountRepository = repository;
        _breadcrumbRepository = breadcrumbRepository;
        _routeRepository = routeRepository;
        _mapper = mapper;
    }

    public async Task<DiscountResponse> Handle(DeleteDiscount request, CancellationToken cancellationToken)
    {
        Discount? removedDiscount;
        
        try
        {
            removedDiscount = await _discountRepository.DeleteByIdAsync(request.Id);

            if (removedDiscount is null)
            {
                throw new NotFoundException("Не удалось найти статью!");
            }
        }
        catch (InvalidOperationException)
        {
            throw new BadRequestException("Не удалось удалить статью!");
        }
        
        var routeId = removedDiscount.RouteId;
        var breadcrumbId = removedDiscount.BreadcrumbId;

        await _routeRepository.DeleteByIdAsync(routeId);
        await _breadcrumbRepository.DeleteByIdAsync(breadcrumbId);

        return _mapper.Map<DiscountResponse>(removedDiscount);
    }
}