using AutoMapper;
using MediatR;

using Application.Requests.Commands.Discount;
using Application.Responses;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.DiscountHandlers;

public class DeleteDiscountHandler : IRequestHandler<DeleteDiscount, DiscountResponse>
{
    private readonly IDiscountRepository _discountRepository;
    private readonly IMapper _mapper;

    public DeleteDiscountHandler(IDiscountRepository repository, IMapper mapper)
    {
        _discountRepository = repository;
        _mapper = mapper;
    }

    public async Task<DiscountResponse> Handle(DeleteDiscount request, CancellationToken cancellationToken)
    {
        return _mapper.Map<DiscountResponse>(await _discountRepository.DeleteByIdAsync(request.Id));
    }
}