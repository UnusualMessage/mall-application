using Application.Requests.Queries.Base;
using Application.Responses;
using MediatR;
using Sieve.Models;

namespace Application.Requests.Queries;

public class GetSievedImages : SievedQuery, IRequest<IEnumerable<ImageResponse>>
{
    public GetSievedImages(SieveModel model) : base(model)
    {
    }
}