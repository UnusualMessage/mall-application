﻿using System.ComponentModel.DataAnnotations;

using Application.Responses;

using MediatR;

namespace Application.Requests.Commands.Event;

public class UpdateEvent : IRequest<EventResponse>
{
    [Required]
    public Guid Id { get; set; }
    
    public string? Title { get; set; }
    public string? Description { get; set; }
}