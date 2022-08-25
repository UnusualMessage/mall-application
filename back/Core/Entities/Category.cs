using Core.Entities.Base;

namespace Core.Entities;

public class Category : Entity, IUpdatable<Category>
{
    public string Title { get; set; } = string.Empty;
    
    public void Update(Category entity)
    {
        Title = entity.Title;
    }
}
