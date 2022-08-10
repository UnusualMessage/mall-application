using MediatR;
using AutoMapper;

using Application.Requests.Commands.Contacts;
using Application.Responses;
using Core.Entities;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.ContactsHandlers;

public class CreateContactsHandler : IRequestHandler<CreateContacts, ContactsResponse>
{
    private readonly IContactsRepository _contactsRepository;
    private readonly IMapper _mapper;

    public CreateContactsHandler(IContactsRepository repository, IMapper mapper)
    {
        _contactsRepository = repository;
        _mapper = mapper;
    }
    
    public async Task<ContactsResponse> Handle(CreateContacts request, CancellationToken cancellationToken)
    {
        return _mapper.Map<ContactsResponse>(await _contactsRepository.AddAsync(_mapper.Map<Contacts>(request)));
    }
}