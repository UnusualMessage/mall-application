using Core.Entities.Base;

namespace Core.Entities;

public class Discount : Entity, IUpdatable<Discount>
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? LogoPath { get; set; }
    public string? Link { get; set; }

    public Guid? ShopId { get; set; }
    public Shop? Shop { get; set; }

    public void Update(Discount discount)
    {
        Title = discount.Title;
        Description = discount.Description;
        LogoPath = discount.LogoPath;
        Link = discount.Link;
        ShopId = discount.ShopId;
    }
}
