using Application.Requests.Queries.Base;
using Application.Responses;

using MediatR;
using Sieve.Models;

namespace Application.Requests.Queries;

public class GetSievedEvents : SievedQuery, IRequest<IEnumerable<EventResponse>>
{
    public GetSievedEvents(SieveModel model) : base(model)
    {
    }
}