using Application.Responses.Base;
using Sieve.Attributes;

namespace Application.Responses;

public class EventResponse : Response
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;
    public string RoutePath { get; set; } = string.Empty;
    
    [Sieve(CanFilter = true)]
    public Guid ShopId { get; set; }

    public ShopResponse Shop { get; set; } = new();
    public ImageResponse Image { get; set; } = new();
}