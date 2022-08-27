using Core.Entities.Base;

namespace Core.Entities;

public class Shop : Entity<Shop>
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Schedule { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Site { get; set; } = string.Empty;
    
    public IEnumerable<Social> Socials { get; set; } = new List<Social>();
    
    public Guid CellId { get; set; }
    public Cell Cell { get; set; } = default!;
    
    public Guid ImageId { get; set; }
    public Image Image { get; set; } = default!;

    public Guid BreadcrumbId { get; set; }
    public Breadcrumb Breadcrumb { get; set; } = default!;
    
    public Guid RouteId { get; set; }
    public Route Route { get; set; } = default!;
    
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = default!;
    
    public IEnumerable<Discount> Discounts { get; set; } = new List<Discount>();
    public IEnumerable<Event> Events { get; set; } = new List<Event>();
    public ICollection<Image> Gallery { get; set; } = new List<Image>();

    public override void Update(Shop shop)
    {
        Title = shop.Title;
        Description = shop.Description;
        Schedule = shop.Schedule;
        Phone = shop.Phone;
        Site = shop.Site;

        CellId = shop.CellId;
        ImageId = shop.ImageId;
        CategoryId = shop.CategoryId;
    }
}
