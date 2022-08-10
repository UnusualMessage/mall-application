using Application.Requests.Queries.Base;
using Application.Responses;

using MediatR;
using Sieve.Models;

namespace Application.Requests.Queries;

public class GetSievedCategories : SievedQuery, IRequest<IEnumerable<CategoryResponse>>
{
    public GetSievedCategories(SieveModel model) : base(model)
    {
    }
}