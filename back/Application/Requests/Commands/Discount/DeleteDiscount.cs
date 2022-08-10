using Application.Responses;

using MediatR;

namespace Application.Requests.Commands.Discount;

public class DeleteDiscount : IRequest<DiscountResponse>
{
    public Guid Id { get; }

    public DeleteDiscount(Guid id)
    {
        Id = id;
    }
}