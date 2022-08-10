using Application.Requests.Queries.Base;
using Application.Responses;
using Core.Entities;
using MediatR;
using Sieve.Models;

namespace Application.Requests.Queries;

public class GetSievedBreadcrumbs : SievedQuery, IRequest<IEnumerable<BreadcrumbResponse>>
{
    public GetSievedBreadcrumbs(SieveModel model) : base(model)
    {
    }
}