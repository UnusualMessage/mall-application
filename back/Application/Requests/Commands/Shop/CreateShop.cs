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
    public string Schedule { get; set; } = string.Empty;

    [Required]
    public string Phone { get; set; } = string.Empty;

    [Required]
    public string Site { get; set; } = string.Empty;
    
    [Required]
    public string Link { get; set; } = string.Empty;
    
    [Required]
    public string RoutePath { get; set; } = string.Empty;

    [Required]
    public Guid CellId { get; set; }
    
    [Required]
    public Guid ImageId { get; set; }
    
    [Required] 
    public Guid CategoryId { get; set; }

    [Required]
    public IEnumerable<CreateSocial> Socials { get; set; } = new List<CreateSocial>();
    
    public IEnumerable<Guid> GalleryIds { get; set; } = new List<Guid>();
}