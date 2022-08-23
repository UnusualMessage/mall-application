using System.ComponentModel.DataAnnotations;
using Application.Requests.Commands.Social;
using Application.Responses;
using MediatR;

namespace Application.Requests.Commands.Shop;

public class CreateShop : IRequest<ShopResponse>
{
    [Required]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public string Link { get; set; } = string.Empty;
    
    [Required]
    public string RoutePath { get; set; } = string.Empty;

    [Required]
    public short Floor { get; set; }
    
    [Required]
    public Guid CellId { get; set; }
    
    [Required]
    public Guid ImageId { get; set; }
    
    [Required] 
    public Guid CategoryId { get; set; }

    [Required]
    public IEnumerable<CreateSocial> Socials { get; set; } = new List<CreateSocial>();

    public string? Schedule { get; set; }
    
    public string? Phone { get; set; }
    
    public string? Site { get; set; }
}