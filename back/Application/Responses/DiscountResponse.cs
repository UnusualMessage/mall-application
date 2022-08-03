using Application.Responses.Base;

namespace Application.Responses;

public class DiscountResponse : Response
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int Duration { get; set; }
    
    public ShopResponse? Shop { get; set; }
}