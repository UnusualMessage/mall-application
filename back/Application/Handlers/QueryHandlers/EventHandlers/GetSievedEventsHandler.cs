using Application.MappingProfiles;
using Application.Requests.Queries.Event;
using Application.Responses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces.Repositories;
using MediatR;
using Sieve.Services;

namespace Application.Handlers.QueryHandlers.EventHandlers;

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
            cfg.AddProfile(new ShopProfile());
            cfg.AddProfile(new CategoryProfile());
            cfg.AddProfile(new ImageProfile());
            cfg.AddProfile(new SocialProfile());
        });

        var response = result.AsQueryable().ProjectTo<EventResponse>(configuration);

        return _processor.Apply(request.SieveModel, response).AsEnumerable();
    }
}