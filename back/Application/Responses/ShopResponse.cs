using Application.Responses.Base;
using Application.Responses.User;

namespace Application.Responses;

public class ShopResponse : Response
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Schedule { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Site { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;
    public string RoutePath { get; set; } = string.Empty;

    public IEnumerable<SocialResponse> Socials { get; set; } = new List<SocialResponse>();
    public ImageResponse Image { get; set; } = new();
    public CategoryResponse Category { get; set; } = new();
}