using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
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
    public string? RoutePath { get; set; }
    public short? Floor { get; set; }
    
    public Guid? ImageId { get; set; }
    public Guid? CategoryId { get; set; }
}