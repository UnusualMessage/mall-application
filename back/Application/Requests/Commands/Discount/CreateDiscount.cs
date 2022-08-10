using System.ComponentModel.DataAnnotations;

using Application.Responses;

using MediatR;

namespace Application.Requests.Commands.Discount;

public class CreateDiscount : IRequest<DiscountResponse>
{
    [Required]
    public string? Title { get; set; }
    
    [Required]
    public string? Description { get; set; }
    
    [Required]
    public string? LogoPath { get; set; }
    
    [Required]
    public string? Link { get; set; }

    [Required]
    public Guid? ShopId { get; set; }
}