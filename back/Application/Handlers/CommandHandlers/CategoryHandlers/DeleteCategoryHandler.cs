using AutoMapper;
using MediatR;

using Application.Requests.Commands.Category;
using Application.Responses;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.CategoryHandlers;

public class DeleteCategoryHandler : IRequestHandler<DeleteCategory, CategoryResponse>
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;

    public DeleteCategoryHandler(ICategoryRepository repository, IMapper mapper)
    {
        _categoryRepository = repository;
        _mapper = mapper;
    }
    
    public async Task<CategoryResponse> Handle(DeleteCategory request, CancellationToken cancellationToken)
    {
        return _mapper.Map<CategoryResponse>(await _categoryRepository.DeleteByIdAsync(request.Id));
    }
}