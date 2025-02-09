﻿using AutoMapper;
using MediatR;

using Application.Requests.Commands.Event;
using Application.Responses;
using Core.Entities;
using Core.Exceptions;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.EventHandlers;

public class DeleteEventHandler : IRequestHandler<DeleteEvent, EventResponse>
{
    private readonly IEventRepository _eventRepository;
    private readonly IRouteRepository _routeRepository;
    private readonly IBreadcrumbRepository _breadcrumbRepository;
    private readonly IMapper _mapper;

    public DeleteEventHandler(IEventRepository repository, IRouteRepository routeRepository, 
        IBreadcrumbRepository breadcrumbRepository, IMapper mapper)
    {
        _eventRepository = repository;
        _breadcrumbRepository = breadcrumbRepository;
        _routeRepository = routeRepository;
        _mapper = mapper;
    }

    public async Task<EventResponse> Handle(DeleteEvent request, CancellationToken cancellationToken)
    {
        Event? removedEvent;
        
        try
        {
            removedEvent = await _eventRepository.DeleteByIdAsync(request.Id);

            if (removedEvent is null)
            {
                throw new NotFoundException("Не удалось найти статью!");
            }
        }
        catch (InvalidOperationException)
        {
            throw new BadRequestException("Не удалось удалить статью!");
        }
        
        var routeId = removedEvent.RouteId;
        var breadcrumbId = removedEvent.BreadcrumbId;

        await _routeRepository.DeleteByIdAsync(routeId);
        await _breadcrumbRepository.DeleteByIdAsync(breadcrumbId);

        return _mapper.Map<EventResponse>(removedEvent);
    }
}