using Core.Entities.Base;

namespace Core.Entities;

public class Event : Entity, IUpdatable<Event>
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    
    public Guid? ImageId { get; set; }
    public Image? Image { get; set; }
    
    public Guid? RouteId { get; set; }
    public Route? Route { get; set; }
    
    public Guid? BreadcrumbId { get; set; }
    public Breadcrumb? Breadcrumb { get; set; }
    
    public Guid? ShopId { get; set; }
    public Shop? Shop { get; set; }
    
    public void Update(Event entity)
    {
        Title = entity.Title;
        Description = entity.Description;
    
        ImageId = entity.ImageId;
        BreadcrumbId = entity.BreadcrumbId;
        RouteId = entity.RouteId;
        ShopId = entity.ShopId;
    }
}
