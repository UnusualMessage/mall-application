using System.ComponentModel.DataAnnotations;
using Application.Responses;
using MediatR;

namespace Application.Requests.Queries.Discount;

public class GetDiscountById : IRequest<DiscountResponse>
{
    [Required]
    public Guid? Id { get; set; }

    public GetDiscountById(Guid id)
    {
        Id = id;
    }
}