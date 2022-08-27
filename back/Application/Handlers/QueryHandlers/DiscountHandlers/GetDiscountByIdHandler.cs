using Application.Requests.Queries.Discount;
using Application.Responses;
using AutoMapper;
using Core.Exceptions;
using Core.Interfaces.Repositories;
using MediatR;

namespace Application.Handlers.QueryHandlers.DiscountHandlers;

public class GetDiscountByIdHandler : IRequestHandler<GetDiscountById, DiscountResponse>
{
    private readonly IDiscountRepository _discountRepository;
    private readonly IMapper _mapper;

    public GetDiscountByIdHandler(IDiscountRepository discountRepository, IMapper mapper)
    {
        _discountRepository = discountRepository;
        _mapper = mapper;
    }
    
    public async Task<DiscountResponse> Handle(GetDiscountById request, CancellationToken cancellationToken)
    {
        var discount = await _discountRepository.GetByIdAsync(request.Id);

        if (discount is null)
        {
            throw new NotFoundException("Статья не найдена!");
        }
        
        return _mapper.Map<DiscountResponse>(discount);
    }
}