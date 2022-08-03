using Core.Entities.Base;

namespace Core.Entities;

public class Discount : Entity
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int Duration { get; set; }

    public Guid? ShopId { get; set; }
    public Shop? Shop { get; set; }

    public void Set(Discount discount)
    {
        Title = discount.Title;
        Description = discount.Description;
        Duration = discount.Duration;
        ShopId = discount.ShopId;
    }
}
