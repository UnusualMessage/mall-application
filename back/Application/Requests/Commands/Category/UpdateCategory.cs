using System.ComponentModel.DataAnnotations;

using Application.Responses;

using MediatR;

namespace Application.Requests.Commands.Category;

public class UpdateCategory : IRequest<CategoryResponse>
{
    [Required]
    public Guid Id { get; set; }
    
    public string? Title { get; set; }
}