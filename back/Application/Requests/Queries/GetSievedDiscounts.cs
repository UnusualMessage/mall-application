using Application.Requests.Queries.Base;
using Application.Responses;

using MediatR;
using Sieve.Models;

namespace Application.Requests.Queries;

public class GetSievedDiscounts : SievedQuery, IRequest<IEnumerable<DiscountResponse>>
{
    public GetSievedDiscounts(SieveModel model) : base(model)
    {
    }
}