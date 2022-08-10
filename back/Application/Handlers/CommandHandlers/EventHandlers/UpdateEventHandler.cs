using MediatR;
using AutoMapper;

using Application.Requests.Commands.Event;
using Application.Responses;
using Core.Entities;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.EventHandlers;

public class UpdateEventHandler : IRequestHandler<UpdateEvent, EventResponse>
{
    private readonly IEventRepository _eventRepository;
    private readonly IMapper _mapper;

    public UpdateEventHandler(IEventRepository repository, IMapper mapper)
    {
        _eventRepository = repository;
        _mapper = mapper;
    }
    
    public async Task<EventResponse> Handle(UpdateEvent request, CancellationToken cancellationToken)
    {
        return _mapper.Map<EventResponse>(await _eventRepository.UpdateAsync(_mapper.Map<Event>(request)));
    }
}