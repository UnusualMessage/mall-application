using System.ComponentModel.DataAnnotations;
using Application.Responses;
using MediatR;

namespace Application.Requests.Queries.Event;

public class GetEventById : IRequest<EventResponse>
{
    [Required]
    public Guid? Id { get; set; }

    public GetEventById(Guid id)
    {
        Id = id;
    }
}