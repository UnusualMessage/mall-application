using Application.Requests.Queries.Base;
using Application.Responses;

using MediatR;
using Sieve.Models;

namespace Application.Requests.Queries;

public class GetSievedContacts : SievedQuery, IRequest<IEnumerable<ContactsResponse>>
{
    public GetSievedContacts(SieveModel model) : base(model)
    {
    }
}