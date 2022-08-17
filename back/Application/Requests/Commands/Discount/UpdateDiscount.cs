using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Application.Responses;

using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Requests.Commands.Discount;

public class UpdateDiscount : IRequest<DiscountResponse>
{
    [Required]
    public Guid Id { get; set; }
    
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Link { get; set; }
    public string? RoutePath { get; set; }
    
    public Guid? ImageId { get; set; }
    public Guid? ShopId { get; set; }
    
}