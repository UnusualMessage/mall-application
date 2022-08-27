using Core.Entities.Base;

namespace Core.Entities;

public class Breadcrumb : Entity<Breadcrumb>
{
    public string Name { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;
    
    public override void Update(Breadcrumb entity)
    {
        Name = entity.Name;
        Link = entity.Link;
    }
}

