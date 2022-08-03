using System.ComponentModel.DataAnnotations;

using Application.Responses;

using MediatR;

namespace Application.Requests.Commands.Discount;

public class UpdateDiscount : IRequest<DiscountResponse>
{
    [Required]
    public Guid Id { get; set; }
    
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? LogoPath { get; set; }
    public string? Link { get; set; }
    public Guid? ShopId { get; set; }
}