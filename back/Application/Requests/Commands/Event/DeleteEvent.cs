using Application.Responses;

using MediatR;

namespace Application.Requests.Commands.Event;

public class DeleteEvent : IRequest<EventResponse>
{
    public Guid Id { get; }

    public DeleteEvent(Guid id)
    {
        Id = id;
    }
}