using Application.MappingProfiles;
using Application.Requests.Queries.Contacts;
using Application.Responses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces.Repositories;
using MediatR;
using Sieve.Services;

namespace Application.Handlers.QueryHandlers.ContactsHandlers;

public class GetSievedContactsHandler : IRequestHandler<GetSievedContacts, IEnumerable<ContactsResponse>>
{
    private readonly IContactsRepository _contactsRepository;
    private readonly ISieveProcessor _processor;

    public GetSievedContactsHandler(IContactsRepository repository, ISieveProcessor processor)
    {
        _contactsRepository = repository;
        _processor = processor;
    }
    
    public async Task<IEnumerable<ContactsResponse>> Handle(GetSievedContacts request, CancellationToken cancellationToken)
    {
        var result = await _contactsRepository.GetAllAsync();

        MapperConfiguration configuration = new(cfg => {
            cfg.AddProfile(new ContactsProfile());
        });

        var response = result.AsQueryable().ProjectTo<ContactsResponse>(configuration);

        return _processor.Apply(request.SieveModel, response).AsEnumerable();
    }
}