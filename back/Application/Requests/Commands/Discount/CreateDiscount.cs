using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Application.Responses;

using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Requests.Commands.Discount;

public class CreateDiscount : IRequest<DiscountResponse>
{
    [Required]
    public string? Title { get; set; }
    
    [Required]
    public string? Description { get; set; }
    
    [Required]
    public Guid? ImageId { get; set; }
    
    [Required]
    public string? Link { get; set; }
    
    [Required]
    public string? RoutePath { get; set; }

    [Required]
    public Guid? ShopId { get; set; }
}