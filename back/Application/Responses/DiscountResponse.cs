using Application.Responses.Base;
using Sieve.Attributes;

namespace Application.Responses;

public class DiscountResponse : Response
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Link { get; set; }
    public string? RoutePath { get; set; }
    
    [Sieve(CanFilter = true)]
    public Guid? ShopId { get; set; }
    
    public ShopResponse? Shop { get; set; }
    public ImageResponse? Image { get; set; }
}