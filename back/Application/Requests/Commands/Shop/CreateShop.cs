using System.ComponentModel.DataAnnotations;

using Application.Responses;

using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Requests.Commands.Shop;

public class CreateShop : IRequest<ShopResponse>
{
    [Required]
    public string? Title { get; set; }
    
    [Required]
    public string? Description { get; set; }
    
    [Required]
    public string? Schedule { get; set; }
    
    [Required]
    public string? Phone { get; set; }
    
    [Required]
    public string? Site { get; set; }
    
    [Required]
    public string? Link { get; set; }

    [Required]
    public short Floor { get; set; }
    
    [Required]
    public IFormFile? Image { get; set; }
    
    public string? Destination { get; set; }

    [Required] 
    public IEnumerable<Guid> CategoryIds { get; set; } = new List<Guid>();

}