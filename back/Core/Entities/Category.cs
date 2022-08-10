using Core.Entities.Base;

namespace Core.Entities;

public class Category : Entity, IUpdatable<Category>
{
    public string? Title { get; set; }
    public ICollection<Shop>? Shops { get; set; } = new List<Shop>();

    public void Update(Category entity)
    {
        Title = entity.Title;
    }
}
