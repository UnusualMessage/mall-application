using Core.Entities.Base;

namespace Core.Entities;

public class Event : Entity, IUpdatable<Event>
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    
    public Guid ImageId { get; set; }
    public Image Image { get; set; } = new();
    
    public Guid RouteId { get; set; }
    public Route Route { get; set; } = new();
    
    public Guid BreadcrumbId { get; set; }
    public Breadcrumb Breadcrumb { get; set; } = new();
    
    public Guid ShopId { get; set; }
    public Shop Shop { get; set; } = new();
    
    public void Update(Event entity)
    {
        Title = entity.Title;
        Description = entity.Description;
    
        ImageId = entity.ImageId;
        ShopId = entity.ShopId;
    }
}
