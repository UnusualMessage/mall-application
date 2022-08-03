using Application.Responses.User;

using MediatR;

namespace Application.Requests.Commands.User;

public class RevokeUser : IRequest<RevokeUserResponse>
{
    public string? RefreshToken { get; set; }
    public string? IpAddress { get; set; }
}