using Application.Responses.Base;

namespace Application.Responses;

public class SocialResponse : Response
{
    public string Name { get; set; } = string.Empty;
    public string Site { get; set; } = string.Empty;
}