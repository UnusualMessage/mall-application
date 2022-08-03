using AutoMapper;
using MediatR;

using Application.Requests.Commands.Event;
using Application.Responses;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.EventHandlers;

public class DeleteEventHandler : IRequestHandler<DeleteEvent, EventResponse>
{
    private readonly IEventRepository _eventRepository;
    private readonly IMapper _mapper;

    public DeleteEventHandler(IEventRepository repository, IMapper mapper)
    {
        _eventRepository = repository;
        _mapper = mapper;
    }

    public async Task<EventResponse> Handle(DeleteEvent request, CancellationToken cancellationToken)
    {
        return _mapper.Map<EventResponse>(await _eventRepository.DeleteByIdAsync(request.Id));
    }
}