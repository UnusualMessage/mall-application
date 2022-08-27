using MediatR;
using AutoMapper;

using Application.Requests.Commands.Event;
using Application.Responses;
using Core.Entities;
using Core.Exceptions;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.EventHandlers;

public class CreateEventHandler : IRequestHandler<CreateEvent, EventResponse>
{
    private readonly IEventRepository _eventRepository;
    private readonly IMapper _mapper;

    public CreateEventHandler(IEventRepository repository, IMapper mapper)
    {
        _eventRepository = repository;
        _mapper = mapper;
    }
    
    public async Task<EventResponse> Handle(CreateEvent request, CancellationToken cancellationToken)
    {
        var newEvent = _mapper.Map<Event>(request);
        
        var id = Guid.NewGuid();

        newEvent.Id = id;

        newEvent.Route = new()
        {
            Path = $"{request.RoutePath}/{id}"
        };

        newEvent.Breadcrumb = new()
        {
            Name = request.Title,
            Link = request.Link
        };

        try
        {
            var discount = await _eventRepository.AddAsync(newEvent);

            if (discount is null)
            {
                throw new NotFoundException("Не удалось создать статью!");
            }
            
            return _mapper.Map<EventResponse>(discount);
        }
        catch (InvalidOperationException)
        {
            throw new BadRequestException("Не удалось создать статью!");
        }
    }
}