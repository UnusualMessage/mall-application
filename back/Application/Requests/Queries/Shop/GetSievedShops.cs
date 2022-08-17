using Application.Requests.Queries.Base;
using Application.Responses;
using MediatR;
using Sieve.Models;

namespace Application.Requests.Queries.Shop;

public class GetSievedShops : SievedQuery, IRequest<IEnumerable<ShopResponse>>
{
    public GetSievedShops(SieveModel model) : base(model)
    {
    }
}