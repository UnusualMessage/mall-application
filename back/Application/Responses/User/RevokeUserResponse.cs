using Application.Responses.Base;

namespace Application.Responses.User;

public class RevokeUserResponse : Response
{
    public bool Revoked { get; set; }
}