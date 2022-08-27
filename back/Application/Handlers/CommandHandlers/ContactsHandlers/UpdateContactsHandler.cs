using MediatR;
using AutoMapper;

using Application.Requests.Commands.Contacts;
using Application.Responses;
using Core.Entities;
using Core.Exceptions;
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
        try
        {
            var contact = await _contactsRepository.UpdateAsync(_mapper.Map<Contacts>(request));

            if (contact is null)
            {
                throw new NotFoundException("Не удалось найти информацию для обновления!");
            }
            
            return _mapper.Map<ContactsResponse>(contact);
        }
        catch (InvalidOperationException)
        {
            throw new BadRequestException("Не удалось обновить информацию! Повторите позже.");
        }
    }
}