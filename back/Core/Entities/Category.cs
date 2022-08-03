using Core.Entities.Base;

namespace Core.Entities;

public class Category : Entity
{
    public string? Title { get; set; }
    public ICollection<Shop>? Shops { get; set; } = new List<Shop>();

    public void Set(Category category)
    {
        Title = category.Title;
    }
}
