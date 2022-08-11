using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Sieve.Services;

using Application.Requests.Queries;
using Application.Responses;
using Application.MappingProfiles;

using Core.Interfaces.Repositories;

namespace Application.Handlers.QueryHandlers;

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
        });

        var response = result.AsQueryable().ProjectTo<DiscountResponse>(configuration);

        return _processor.Apply(request.SieveModel, response).AsEnumerable();
    }
}