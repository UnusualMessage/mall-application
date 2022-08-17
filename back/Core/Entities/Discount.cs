using Core.Entities.Base;

namespace Core.Entities;

public class Discount : Entity, IUpdatable<Discount>
{
    public string? Title { get; set; }
    public string? Description { get; set; }

    public Guid? ImageId { get; set; }
    public Image? Image { get; set; }
    
    public Guid? BreadcrumbId { get; set; }
    public Breadcrumb? Breadcrumb { get; set; }
    
    public Guid? RouteId { get; set; }
    public Route? Route { get; set; }

    public Guid? ShopId { get; set; }
    public Shop? Shop { get; set; }

    public void Update(Discount discount)
    {
        Title = discount.Title;
        Description = discount.Description;

        ImageId = discount.ImageId;
        RouteId = discount.RouteId;
        BreadcrumbId = discount.BreadcrumbId;
        ShopId = discount.ShopId;
    }
}
