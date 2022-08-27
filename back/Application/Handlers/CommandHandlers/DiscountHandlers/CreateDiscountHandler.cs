using MediatR;
using AutoMapper;

using Application.Requests.Commands.Discount;
using Application.Responses;
using Core.Entities;
using Core.Exceptions;
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
        var newDiscount = _mapper.Map<Discount>(request);
        
        var id = Guid.NewGuid();

        newDiscount.Id = id;

        newDiscount.Route = new()
        {
            Path = $"{request.RoutePath}/{id}"
        };

        newDiscount.Breadcrumb = new()
        {
            Name = request.Title,
            Link = request.Link
        };

        try
        {
            var discount = await _discountRepository.AddAsync(newDiscount);

            if (discount is null)
            {
                throw new NotFoundException("Не удалось создать статью!");
            }
            
            return _mapper.Map<DiscountResponse>(discount);
        }
        catch (InvalidOperationException)
        {
            throw new BadRequestException("Не удалось создать статью!");
        }
    }
}