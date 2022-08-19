using Application.Responses.Base;
using Application.Responses.User;

namespace Application.Responses;

public class ShopResponse : Response
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Schedule { get; set; }
    public string? Phone { get; set; }
    public string? Site { get; set; }
    public short Floor { get; set; }
    public string? Link { get; set; }
    public string? RoutePath { get; set; }
    
    public IEnumerable<SocialResponse>? Socials { get; set; }
    public ImageResponse? Image { get; set; }
    public CategoryResponse? Category { get; set; }
}