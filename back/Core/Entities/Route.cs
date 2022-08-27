using Core.Entities.Base;

namespace Core.Entities;

public class Route : Entity<Route>
{
    public string Path { get; set; } = string.Empty;
    
    public override void Update(Route route)
    {
        Path = route.Path;
    }
}