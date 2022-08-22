﻿using Core.Entities.Base;

namespace Core.Entities;

public class Image : Entity, IUpdatable<Image>
{
    public string Path { get; set; } = string.Empty;
    
    public void Update(Image entity)
    {
        Path = entity.Path;
    }
}