using Core.Entities.Base;

namespace Core.Entities;

public class Social : Entity, IUpdatable<Social>
{
    public string? Name { get; set; }
    public string? Site { get; set; }

    public void Update(Social social)
    {
        Name = social.Name;
        Site = social.Site;    
    }
}