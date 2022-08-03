using MediatR;
using AutoMapper;

using Application.Requests.Commands.Contacts;
using Application.Responses;
using Core.Interfaces.Repositories;

namespace Application.Handlers.CommandHandlers.ContactsHandlers;

public class DeleteContactsHandler : IRequestHandler<DeleteContacts, ContactsResponse>
{
    private readonly IContactsRepository _contactsRepository;
    private readonly IMapper _mapper;

    public DeleteContactsHandler(IContactsRepository repository, IMapper mapper)
    {
        _contactsRepository = repository;
        _mapper = mapper;
    }
    
    public async Task<ContactsResponse> Handle(DeleteContacts request, CancellationToken cancellationToken)
    {
        return _mapper.Map<ContactsResponse>(await _contactsRepository.DeleteByIdAsync(request.Id));
    }
}