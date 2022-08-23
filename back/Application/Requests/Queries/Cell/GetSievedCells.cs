using Application.Requests.Queries.Base;
using Application.Responses;
using MediatR;
using Sieve.Models;

namespace Application.Requests.Queries.Cell;

public class GetSievedCells : SievedQuery, IRequest<IEnumerable<CellResponse>>
{
    public GetSievedCells(SieveModel model) : base(model)
    {
    }
}