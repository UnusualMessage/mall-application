using Application.Responses;

using MediatR;

namespace Application.Requests.Commands.Contacts;

public class DeleteContacts : IRequest<ContactsResponse>
{
    public Guid Id { get; }

    public DeleteContacts(Guid id)
    {
        Id = id;
    }
}