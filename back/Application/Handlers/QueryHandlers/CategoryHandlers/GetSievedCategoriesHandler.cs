using Application.MappingProfiles;
using Application.Requests.Queries.Category;
using Application.Responses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces.Repositories;
using MediatR;
using Sieve.Services;

namespace Application.Handlers.QueryHandlers.CategoryHandlers;

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