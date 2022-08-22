using System.ComponentModel.DataAnnotations;
using Application.Responses;
using MediatR;

namespace Application.Requests.Queries.Category;

public class GetCategoryById : IRequest<CategoryResponse>
{
    [Required]
    public Guid Id { get; set; }

    public GetCategoryById(Guid id)
    {
        Id = id;
    }
}