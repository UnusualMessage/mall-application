using Core.Entities.Base;

namespace Core.Entities;

public class Photo : Entity
{
    public string? Name;
    public string? Path;
    
    public Guid? ShopId { get; set; }
    public Shop? Shop { get; set; }
}