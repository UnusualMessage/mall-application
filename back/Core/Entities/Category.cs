using Core.Entities.Base;

namespace Core.Entities;

public class Category : Entity<Category>
{
    public string Title { get; set; } = string.Empty;
    
    public override void Update(Category entity)
    {
        Title = entity.Title;
    }
}
