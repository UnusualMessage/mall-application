using Application.Requests.Queries.Contacts;
using Application.Responses;
using AutoMapper;
using Core.Interfaces.Repositories;
using MediatR;

namespace Application.Handlers.QueryHandlers.ContactsHandlers;

public class GetContactsHandler : IRequestHandler<GetContacts, ContactsResponse>
{
    private readonly IContactsRepository _contactsRepository;
    private readonly IMapper _mapper;
    
    public GetContactsHandler(IContactsRepository repository, IMapper mapper)
    {
        _contactsRepository = repository;
        _mapper = mapper;
    }
    
    public async Task<ContactsResponse> Handle(GetContacts request, CancellationToken cancellationToken)
    {
        var contacts = await _contactsRepository.GetAllAsync();
        var contact = contacts.ToList().FirstOrDefault();

        if (contact is null)
        {
            throw new NullReferenceException();
        }
        
        return _mapper.Map<ContactsResponse>(contact);
    }
}