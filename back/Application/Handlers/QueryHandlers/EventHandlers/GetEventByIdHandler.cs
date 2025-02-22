﻿using Application.Requests.Queries.Event;
using Application.Responses;
using AutoMapper;
using Core.Exceptions;
using Core.Interfaces.Repositories;
using MediatR;

namespace Application.Handlers.QueryHandlers.EventHandlers;

public class GetEventByIdHandler : IRequestHandler<GetEventById, EventResponse>
{
    private readonly IEventRepository _eventRepository;
    private readonly IMapper _mapper;

    public GetEventByIdHandler(IEventRepository repository, IMapper mapper)
    {
        _eventRepository = repository;
        _mapper = mapper;
    }
    
    public async Task<EventResponse> Handle(GetEventById request, CancellationToken cancellationToken)
    {
        var entity = await _eventRepository.GetByIdAsync(request.Id);

        if (entity is null)
        {
            throw new NotFoundException("Статья не найдена!");
        }
        
        return _mapper.Map<EventResponse>(entity);
    }
}