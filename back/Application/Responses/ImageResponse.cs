using Application.Responses.Base;

namespace Application.Responses;

public class ImageResponse : Response
{
    public string? Path { get; set; }
}