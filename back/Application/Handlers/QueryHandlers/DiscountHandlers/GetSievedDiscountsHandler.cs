using Application.MappingProfiles;
using Application.Requests.Queries.Discount;
using Application.Responses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces.Repositories;
using MediatR;
using Sieve.Services;

namespace Application.Handlers.QueryHandlers.DiscountHandlers;

public class GetSievedDiscountsHandler : IRequestHandler<GetSievedDiscounts, IEnumerable<DiscountResponse>>
{
    private readonly IDiscountRepository _discountRepository;
    private readonly ISieveProcessor _processor;

    public GetSievedDiscountsHandler(IDiscountRepository repository, ISieveProcessor processor)
    {
        _discountRepository = repository;
        _processor = processor;
    }
    
    public async Task<IEnumerable<DiscountResponse>> Handle(GetSievedDiscounts request, CancellationToken cancellationToken)
    {
        var result = await _discountRepository.GetAllAsync();

        MapperConfiguration configuration = new(cfg =>
        {
            cfg.AddProfile(new DiscountProfile());
            cfg.AddProfile(new ShopProfile());
            cfg.AddProfile(new CategoryProfile());
            cfg.AddProfile(new ImageProfile());
        });

        var response = result.AsQueryable().ProjectTo<DiscountResponse>(configuration);

        return _processor.Apply(request.SieveModel, response).AsEnumerable();
    }
}