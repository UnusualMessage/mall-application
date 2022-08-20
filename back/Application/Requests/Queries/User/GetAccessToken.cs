using Application.Responses.User;
using MediatR;

namespace Application.Requests.Queries.User;

public class GetAccessToken : IRequest<AuthenticateUserResponse>
{
    public string? RefreshToken { get; set; }
    public string? IpAddress { get; set; }
}