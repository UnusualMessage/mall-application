using Application.Responses.Base;

namespace Application.Responses;

public class RouteResponse : Response
{
    public string? Path { get; set; }
}