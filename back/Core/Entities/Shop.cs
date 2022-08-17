using Core.Entities.Base;

namespace Core.Entities;

public class Shop : Entity, IUpdatable<Shop>
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Schedule { get; set; }
    public string? Phone { get; set; }
    public string? Site { get; set; }
    public short Floor { get; set; }
    
    public Guid? ImageId { get; set; }
    public Image? Image { get; set; }

    public Guid? BreadcrumbId { get; set; }
    public Breadcrumb? Breadcrumb { get; set; }
    
    public Guid? RouteId { get; set; }
    public Route? Route { get; set; }
    
    public Guid? CategoryId { get; set; }
    public Category? Category { get; set; }
    
    public ICollection<Discount>? Discounts { get; set; } = new List<Discount>();
    public ICollection<Event>? Events { get; set; } = new List<Event>();

    public void Update(Shop shop)
    {
        Title = shop.Title;
        Description = shop.Description;
        Schedule = shop.Schedule;
        Phone = shop.Phone;
        Site = shop.Site;
        Floor = shop.Floor;
        ImageId = shop.ImageId;
        CategoryId = shop.CategoryId;

        BreadcrumbId = shop.BreadcrumbId;
        RouteId = shop.RouteId;
    }
}
