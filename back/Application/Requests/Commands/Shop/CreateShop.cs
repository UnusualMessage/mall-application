using System.ComponentModel.DataAnnotations;

using Application.Responses;

using MediatR;

namespace Application.Requests.Commands.Shop;

public class CreateShop : IRequest<ShopResponse>
{
    [Required]
    public string? Name { get; set; }
    
    [Required]
    public string? Description { get; set; }
    
    [Required]
    public short Floor { get; set; }
    
    public string? Site { get; set; }
    
    [Required]
    public bool Opened { get; set; }
    
    [Required]
    public string? PhotoPath { get; set; }
    
    [Required]
    public Guid? CategoryId { get; set; }
}