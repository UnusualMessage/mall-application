using System.ComponentModel.DataAnnotations;
using Application.Responses;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Requests.Commands.Image;

public class CreateImage : IRequest<ImageResponse>
{
    [Required]
    public IFormFile Image { get; set; }

    public string? Destination { get; set; } = string.Empty;
}