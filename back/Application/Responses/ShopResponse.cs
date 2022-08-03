using Application.Responses.Base;

namespace Application.Responses;

public class ShopResponse : Response
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public short Floor { get; set; }
    public string? Site { get; set; }
    public bool Opened { get; set; }
    public string? PhotoPath { get; set; }
    
    public CategoryResponse? Category { get; set; }
}