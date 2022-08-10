using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Application.Responses;

using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Requests.Commands.Event;

public class CreateEvent : IRequest<EventResponse>
{
    [Required]
    public string? Title { get; set; }
    
    [Required]
    public string? Description { get; set; }
    
    [Required]
    public IFormFile? Image { get; set; }
    
    [Required]
    public string? Link { get; set; }
    
    [Required]
    public string? RoutePath { get; set; }
    
    [Required]
    public Guid? ShopId { get; set; }
    
    [JsonIgnore]
    public string? Destination { get; set; }
}