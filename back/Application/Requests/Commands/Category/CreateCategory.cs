using System.ComponentModel.DataAnnotations;

using Application.Responses;

using MediatR;

namespace Application.Requests.Commands.Category;

public class CreateCategory : IRequest<CategoryResponse>
{
    [Required]
    public string? Title { get; set; }
}