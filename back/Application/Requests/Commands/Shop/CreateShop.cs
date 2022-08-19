using System.ComponentModel.DataAnnotations;
using Application.Requests.Commands.Social;
using Application.Responses;
using MediatR;

namespace Application.Requests.Commands.Shop;

public class CreateShop : IRequest<ShopResponse>
{
    [Required]
    public string? Title { get; set; }
    
    [Required]
    public string? Description { get; set; }

    [Required]
    public string? Link { get; set; }
    
    [Required]
    public string? RoutePath { get; set; }

    [Required]
    public short Floor { get; set; }
    
    [Required]
    public Guid? ImageId { get; set; }
    
    [Required] 
    public Guid? CategoryId { get; set; }

    public IEnumerable<CreateSocial>? Socials { get; set; }

    public string? Schedule { get; set; }
    
    public string? Phone { get; set; }
    
    public string? Site { get; set; }
}