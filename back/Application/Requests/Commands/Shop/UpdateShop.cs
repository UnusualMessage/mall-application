using System.ComponentModel.DataAnnotations;
using Application.Responses;

using MediatR;

namespace Application.Requests.Commands.Shop;

public class UpdateShop : IRequest<ShopResponse>
{
    [Required]
    public Guid Id { get; set; }
    
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Schedule { get; set; }
    public string? Phone { get; set; }
    public string? Site { get; set; }
    public string? Link { get; set; }
    public short Floor { get; set; }
    public string? LogoPath { get; set; }
    public ICollection<Core.Entities.Category> Categories { get; set; } 
}