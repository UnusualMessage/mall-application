using Core.Entities.Base;

namespace Core.Entities;

public class Event : Entity, IUpdatable<Event>
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? LogoPath { get; set; }
    public string? Link { get; set; }
    
    public Guid? ShopId { get; set; }
    public Shop? Shop { get; set; }
    
    public void Update(Event entity)
    {
        Title = entity.Title;
        Description = entity.Description;
        LogoPath = entity.LogoPath;
        Link = entity.Link;
        ShopId = entity.ShopId;
    }
}
