using System.ComponentModel.DataAnnotations;
using Application.Responses;

using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Requests.Commands.Shop;

public class UpdateShop : IRequest<ShopResponse>
{
    [Required]
    public Guid Id { get; set; }
    
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Schedule { get; set; }
    public string? Phone { get; set; }
    public string? Site { get; set; }
    public string? Link { get; set; }
    public string? RouteName { get; set; }
    public short? Floor { get; set; }
    public string? Destination { get; set; }
    public IFormFile? Image { get; set; }
    public ICollection<Core.Entities.Category>? Categories { get; set; } 
}