using AutoMapper;
using MediatR;

using Application.Requests.Commands.Discount;
using Application.Responses;
using Core.Entities;
using Core.Exceptions;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;

namespace Application.Handlers.CommandHandlers.DiscountHandlers;

public class UpdateDiscountHandler : IRequestHandler<UpdateDiscount, DiscountResponse>
{
    private readonly IDiscountRepository _discountRepository;
    private readonly IMapper _mapper;

    public UpdateDiscountHandler(IDiscountRepository repository, IMapper mapper)
    {
        _discountRepository = repository;
        _mapper = mapper;
    }
    
    public async Task<DiscountResponse> Handle(UpdateDiscount request, CancellationToken cancellationToken)
    {
        var discountToBeUpdated = await _discountRepository.GetByIdAsync(request.Id);

        if (discountToBeUpdated is null)
        {
            throw new NotFoundException("Не удалось найти статью!");
        }
        
        discountToBeUpdated.Route?.Update(new()
        {
            Path = request.RoutePath
        });
        
        discountToBeUpdated.Breadcrumb?.Update(new()
        {
            Name = request.Title,
            Link = request.Link
        });

        try
        {
            return _mapper.Map<DiscountResponse>(await _discountRepository.UpdateAsync(_mapper.Map<Discount>(request)));
        }
        catch (InvalidOperationException)
        {
            throw new BadRequestException("Не удалось обновить статью!");
        }
    }
}