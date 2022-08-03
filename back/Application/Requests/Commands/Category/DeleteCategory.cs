using MediatR;

using Application.Responses;

namespace Application.Requests.Commands.Category;

public class DeleteCategory : IRequest<CategoryResponse>
{
    public Guid Id { get; }

    public DeleteCategory(Guid id)
    {
        Id = id;
    }
}