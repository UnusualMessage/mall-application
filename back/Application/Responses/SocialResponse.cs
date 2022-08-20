using Application.Responses.Base;

namespace Application.Responses.User;

public class SocialResponse : Response
{
    public string? Name { get; set; }
    public string? Site { get; set; }
}