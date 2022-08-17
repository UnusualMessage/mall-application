using Application.Requests.Queries.Base;
using Application.Responses;
using MediatR;
using Sieve.Models;

namespace Application.Requests.Queries.Image;

public class GetSievedImages : SievedQuery, IRequest<IEnumerable<ImageResponse>>
{
    public GetSievedImages(SieveModel model) : base(model)
    {
    }
}