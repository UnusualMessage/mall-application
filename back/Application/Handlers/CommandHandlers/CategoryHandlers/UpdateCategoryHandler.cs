using MediatR;
using AutoMapper;

using Application.Requests.Commands.Category;
using Application.Responses;
using Core.Entities;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.CategoryHandlers;

public class UpdateCategoryHandler : IRequestHandler<UpdateCategory, CategoryResponse>
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;

    public UpdateCategoryHandler(ICategoryRepository repository, IMapper mapper)
    {
        _categoryRepository = repository;
        _mapper = mapper;
    }
    
    public async Task<CategoryResponse> Handle(UpdateCategory request, CancellationToken cancellationToken)
    {
        try
        {
            var category = await _categoryRepository.UpdateAsync(_mapper.Map<Category>(request));

            if (category is null)
            {
                throw new NullReferenceException();
            }
            
            return _mapper.Map<CategoryResponse>(category);
        }
        catch (NullReferenceException)
        {
            throw new NullReferenceException();
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException();
        }
    }
}