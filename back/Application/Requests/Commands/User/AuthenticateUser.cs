using System.ComponentModel.DataAnnotations;

using Application.Responses.User;

using MediatR;

namespace Application.Requests.Commands.User;

public class AuthenticateUser : IRequest<AuthenticateUserResponse>
{
    [Required]
    public string? Login { get; set; }

    [Required]
    public string? Password { get; set; }

    public string? IpAddress { get; set; }
}