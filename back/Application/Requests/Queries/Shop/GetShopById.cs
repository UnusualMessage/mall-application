using System.ComponentModel.DataAnnotations;
using Application.Responses;
using MediatR;

namespace Application.Requests.Queries.Shop;

public class GetShopById : IRequest<ShopResponse>
{
    [Required]
    public Guid? Id { get; set; }

    public GetShopById(Guid id)
    {
        Id = id;
    }
}