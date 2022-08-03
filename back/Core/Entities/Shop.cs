using Core.Entities.Base;

namespace Core.Entities;

public class Shop : Entity
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public short Floor { get; set; }
    public string? Site { get; set; }
    public bool Opened { get; set; }
    public string? PhotoPath { get; set; }

    public ICollection<Discount>? Discounts { get; set; } = new List<Discount>();
    public ICollection<Photo>? Photos { get; set; } = new List<Photo>();
    
    public Guid? CategoryId { get; set; }
    public Category? Category { get; set; }

    public void Set(Shop shop)
    {
        Name = shop.Name;
        Description = shop.Description;
        Floor = shop.Floor;
        Site = shop.Site;
        Opened = shop.Opened;
        PhotoPath = shop.PhotoPath;
        CategoryId = shop.CategoryId;
    }
}
