using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Sieve.Services;

using Application.Requests.Queries;
using Application.Responses;
using Application.MappingProfiles;

using Core.Interfaces.Repositories;

namespace Application.Handlers.QueryHandlers;

public class GetSievedEventsHandler : IRequestHandler<GetSievedEvents, IEnumerable<EventResponse>>
{
    private readonly IEventRepository _eventRepository;
    private readonly ISieveProcessor _processor;

    public GetSievedEventsHandler(IEventRepository repository, ISieveProcessor processor)
    {
        _eventRepository = repository;
        _processor = processor;
    }
    
    public async Task<IEnumerable<EventResponse>> Handle(GetSievedEvents request, CancellationToken cancellationToken)
    {
        var result = await _eventRepository.GetAllAsync();

        MapperConfiguration configuration = new(cfg => {
            cfg.AddProfile(new EventProfile());
        });

        var response = result.AsQueryable().ProjectTo<EventResponse>(configuration);

        return _processor.Apply(request.SieveModel, response).AsEnumerable();
    }
}