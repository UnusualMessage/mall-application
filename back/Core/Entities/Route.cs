﻿using Core.Entities.Base;

namespace Core.Entities;

public class Route : Entity, IUpdatable<Route>
{
    public string? Path { get; set; }
    
    public void Update(Route route)
    {
        Path = route.Path;
    }
}