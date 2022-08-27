using Application.Responses.Base;
using Application.Responses.User;
using Core.Entities;

namespace Application.Responses;

public class ShopResponse : Response
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Schedule { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Site { get; set; } = string.Empty;
    public short Floor { get; set; }
    public string Link { get; set; } = string.Empty;
    public string RoutePath { get; set; } = string.Empty;

    public IEnumerable<SocialResponse> Socials { get; set; } = new List<SocialResponse>();
    public IEnumerable<ImageResponse> Gallery { get; set; } = new List<ImageResponse>();
    
    public ImageResponse Image { get; set; } = default!;
    public CategoryResponse Category { get; set; } = default!;
    public Guid CellId { get; set; }
}