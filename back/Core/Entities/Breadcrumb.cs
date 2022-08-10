using Core.Entities.Base;

namespace Core.Entities;

public class Breadcrumb : Entity, IUpdatable<Breadcrumb>
{
    public string? Name { get; set; }
    public string? Link { get; set; }
    
    public void Update(Breadcrumb entity)
    {
        Name = entity.Name;
        Link = entity.Link;
    }
}

