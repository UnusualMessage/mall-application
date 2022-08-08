﻿using Application.Responses.Base;

namespace Application.Responses;

public class ShopResponse : Response
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Schedule { get; set; }
    public string? Phone { get; set; }
    public string? Site { get; set; }
    public string? Link { get; set; }
    public string? RouteName { get; set; }
    public short Floor { get; set; }
    public string? Image { get; set; }
    public ICollection<CategoryResponse>? Categories { get; set; }
}