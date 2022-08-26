using MediatR;
using AutoMapper;

using Application.Requests.Commands.Category;
using Application.Responses;
using Core.Entities;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.CategoryHandlers;

public class CreateCategoryHandler : IRequestHandler<CreateCategory, CategoryResponse>
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;

    public CreateCategoryHandler(ICategoryRepository repository, IMapper mapper)
    {
        _categoryRepository = repository;
        _mapper = mapper;
    }
        
    public async Task<CategoryResponse> Handle(CreateCategory request, CancellationToken cancellationToken)
    {
        var category = await _categoryRepository.AddAsync(_mapper.Map<Category>(request));

        if (category is null)
        {
            throw new NullReferenceException();
        }
        
        return _mapper.Map<CategoryResponse>(category);
    }
}