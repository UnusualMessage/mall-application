using MediatR;
using AutoMapper;

using Application.Requests.Commands.Discount;
using Application.Responses;
using Core.Entities;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.DiscountHandlers;

public class CreateDiscountHandler : IRequestHandler<CreateDiscount, DiscountResponse>
{
    private readonly IDiscountRepository _discountRepository;
    private readonly IMapper _mapper;

    public CreateDiscountHandler(IDiscountRepository repository, IMapper mapper)
    {
        _discountRepository = repository;
        _mapper = mapper;
    }
    
    public async Task<DiscountResponse> Handle(CreateDiscount request, CancellationToken cancellationToken)
    {
        return _mapper.Map<DiscountResponse>(await _discountRepository.AddAsync(_mapper.Map<Discount>(request)));
    }
}