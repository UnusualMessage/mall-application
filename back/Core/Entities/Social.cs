using Core.Entities.Base;

namespace Core.Entities;

public class Social : Entity<Social>
{
    public string Name { get; set; } = string.Empty;
    public string Site { get; set; } = string.Empty;

    public override void Update(Social social)
    {
        Name = social.Name;
        Site = social.Site;
    }
}