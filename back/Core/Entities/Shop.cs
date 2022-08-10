using Core.Entities.Base;

namespace Core.Entities;

public class Shop : Entity, IUpdatable<Shop>
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Schedule { get; set; }
    public string? Phone { get; set; }
    public string? Site { get; set; }
    public string? Link { get; set; }
    public short Floor { get; set; }
    public string? Image { get; set; }

    public Guid? RouteId { get; set; }
    public Route Route { get; set; }

    public ICollection<Category>? Categories { get; set; } = new List<Category>();
    public ICollection<Discount>? Discounts { get; set; } = new List<Discount>();
    public ICollection<Event>? Events { get; set; } = new List<Event>();

    public void Update(Shop shop)
    {
        Title = shop.Title;
        Description = shop.Description;
        Schedule = shop.Schedule;
        Phone = shop.Phone;
        Site = shop.Site;
        Link = shop.Link;
        Floor = shop.Floor;
        Image = shop.Image;
        RouteId = shop.RouteId;
    }
}
