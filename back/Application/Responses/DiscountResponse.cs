using Application.Responses.Base;

namespace Application.Responses;

public class DiscountResponse : Response
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? LogoPath { get; set; }
    public string? Link { get; set; }
}