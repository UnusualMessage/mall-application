using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Sieve.Services;

using Application.Requests.Queries;
using Application.Responses;
using Application.MappingProfiles;

using Core.Interfaces.Repositories;

namespace Application.Handlers.QueryHandlers;

public class GetSievedCategoriesHandler : IRequestHandler<GetSievedCategories, IEnumerable<CategoryResponse>>
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly ISieveProcessor _processor;

    public GetSievedCategoriesHandler(ICategoryRepository repository, ISieveProcessor processor)
    {
        _categoryRepository = repository;
        _processor = processor;
    }
    
    public async Task<IEnumerable<CategoryResponse>> Handle(GetSievedCategories request, CancellationToken cancellationToken)
    {
        var result = await _categoryRepository.GetAllAsync();

        MapperConfiguration configuration = new(cfg => {
            cfg.AddProfile(new CategoryProfile());
        });

        var response = result.AsQueryable().ProjectTo<CategoryResponse>(configuration);

        return _processor.Apply(request.SieveModel, response).AsEnumerable();
    }
}