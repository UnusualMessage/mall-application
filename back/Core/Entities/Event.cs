using Core.Entities.Base;

namespace Core.Entities;

public class Event : Entity
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    
    public void Set(Event entity)
    {
        Title = entity.Title;
        Description = entity.Description;
    }
}
