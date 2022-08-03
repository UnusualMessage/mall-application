using Application.Responses;

using MediatR;

namespace Application.Requests.Commands.Shop;

public class DeleteShop : IRequest<ShopResponse>
{
    public Guid Id { get; }

    public DeleteShop(Guid id)
    {
        Id = id;
    }
}