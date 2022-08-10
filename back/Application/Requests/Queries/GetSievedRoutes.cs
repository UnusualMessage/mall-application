using Application.Requests.Queries.Base;
using Application.Responses;
using MediatR;
using Sieve.Models;

namespace Application.Requests.Queries;

public class GetSievedRoutes : SievedQuery, IRequest<IEnumerable<RouteResponse>>
{
    public GetSievedRoutes(SieveModel model) : base(model)
    {
    }
}