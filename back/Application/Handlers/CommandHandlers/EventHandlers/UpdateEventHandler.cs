using MediatR;
using AutoMapper;

using Application.Requests.Commands.Event;
using Application.Responses;
using Core.Entities;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;

namespace Application.Handlers.CommandHandlers.EventHandlers;

public class UpdateEventHandler : IRequestHandler<UpdateEvent, EventResponse>
{
    private readonly IEventRepository _eventRepository;
    private readonly IFileService _fileService;
    private readonly IMapper _mapper;

    public UpdateEventHandler(IEventRepository repository, IMapper mapper, IFileService fileService)
    {
        _eventRepository = repository;
        _mapper = mapper;
        _fileService = fileService;
    }
    
    public async Task<EventResponse> Handle(UpdateEvent request, CancellationToken cancellationToken)
    {
        var eventToBeUpdated = await _eventRepository.GetByIdAsync(request.Id);
        eventToBeUpdated?.Route?.Update(new Route()
        {
            Path = request.RoutePath
        });
        
        eventToBeUpdated?.Breadcrumb?.Update(new Breadcrumb()
        {
            Name = request.Title,
            Link = request.Link
        });

        var newEvent = _mapper.Map<Event>(request);
        newEvent.LogoPath = await _fileService.UploadFile(request.Image, request.Destination!);
        
        return _mapper.Map<EventResponse>(await _eventRepository.UpdateAsync(_mapper.Map<Event>(request)));
    }
}