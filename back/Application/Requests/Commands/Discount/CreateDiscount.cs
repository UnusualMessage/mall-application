using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Application.Responses;

using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Requests.Commands.Discount;

public class CreateDiscount : IRequest<DiscountResponse>
{
    [Required] 
    public string Title { get; set; } = string.Empty;
    
    [Required]
    public string Description { get; set; } = string.Empty;
    
    [Required]
    public Guid ImageId { get; set; }
    
    [Required]
    public string Link { get; set; } = string.Empty;
    
    [Required]
    public string RoutePath { get; set; } = string.Empty;

    [Required]
    public Guid ShopId { get; set; }
}