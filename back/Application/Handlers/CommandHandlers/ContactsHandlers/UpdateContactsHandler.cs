using MediatR;
using AutoMapper;

using Application.Requests.Commands.Contacts;
using Application.Responses;
using Core.Entities;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.ContactsHandlers;

public class UpdateContactsHandler : IRequestHandler<UpdateContacts, ContactsResponse>
{
    private readonly IContactsRepository _contactsRepository;
    private readonly IMapper _mapper;

    public UpdateContactsHandler(IContactsRepository repository, IMapper mapper)
    {
        _contactsRepository = repository;
        _mapper = mapper;
    }
    
    public async Task<ContactsResponse> Handle(UpdateContacts request, CancellationToken cancellationToken)
    {
        return _mapper.Map<ContactsResponse>(await _contactsRepository.UpdateAsync(_mapper.Map<Contacts>(request)));
    }
}