using MediatR;
using AutoMapper;

using Application.Requests.Commands.Event;
using Application.Responses;
using Core.Entities;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;

namespace Application.Handlers.CommandHandlers.EventHandlers;

public class CreateEventHandler : IRequestHandler<CreateEvent, EventResponse>
{
    private readonly IEventRepository _eventRepository;
    private readonly IRouteRepository _routeRepository;
    private readonly IBreadcrumbRepository _breadcrumbRepository;
    private readonly IMapper _mapper;
    private readonly IFileService _fileService;

    public CreateEventHandler(IEventRepository repository, IRouteRepository routeRepository, 
        IBreadcrumbRepository breadcrumbRepository, IMapper mapper, IFileService fileService)
    {
        _eventRepository = repository;
        _routeRepository = routeRepository;
        _breadcrumbRepository = breadcrumbRepository;
        _mapper = mapper;
        _fileService = fileService;
    }
    
    public async Task<EventResponse> Handle(CreateEvent request, CancellationToken cancellationToken)
    {
        var newEvent = _mapper.Map<Event>(request);
        newEvent.LogoPath = await _fileService.UploadFile(request.Image, request.Destination!);
        
        var route = await _routeRepository.AddAsync(new Route()
            {
                Path = request.RoutePath
            }
        );

        var breadcrumb = await _breadcrumbRepository.AddAsync(new Breadcrumb()
            {
                Name = request.Title,
                Link = request.Link
            }
        );
        
        if (route is null || breadcrumb is null)
        {
            return null;
        }

        newEvent.RouteId = route.Id;
        newEvent.BreadcrumbId = breadcrumb.Id;
        
        return _mapper.Map<EventResponse>(await _eventRepository.AddAsync(newEvent));
    }
}