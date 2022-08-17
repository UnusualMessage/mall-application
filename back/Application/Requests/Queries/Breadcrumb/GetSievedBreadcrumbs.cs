using Application.Requests.Queries.Base;
using Application.Responses;
using MediatR;
using Sieve.Models;

namespace Application.Requests.Queries.Breadcrumb;

public class GetSievedBreadcrumbs : SievedQuery, IRequest<IEnumerable<BreadcrumbResponse>>
{
    public GetSievedBreadcrumbs(SieveModel model) : base(model)
    {
    }
}