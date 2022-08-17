using Application.Requests.Queries.Category;
using Application.Responses;
using AutoMapper;
using Core.Interfaces.Repositories;
using MediatR;

namespace Application.Handlers.QueryHandlers.CategoryHandlers;

public class GetCategoryByIdHandler : IRequestHandler<GetCategoryById, CategoryResponse>
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;
    
    public GetCategoryByIdHandler(ICategoryRepository repository, IMapper mapper)
    {
        _categoryRepository = repository;
        _mapper = mapper;
    }
    
    public async Task<CategoryResponse> Handle(GetCategoryById request, CancellationToken cancellationToken)
    {
        return _mapper.Map<CategoryResponse>(await _categoryRepository.GetByIdAsync(request.Id));
    }
}