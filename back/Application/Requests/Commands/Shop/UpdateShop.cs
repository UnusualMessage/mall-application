using Application.Responses;

using MediatR;

namespace Application.Requests.Commands.Shop;

public class UpdateShop : IRequest<ShopResponse>
{
    public Guid Id { get; set; }
    
    public string? Name { get; set; }
    public string? Description { get; set; }
    public short Floor { get; set; }
    public string? Site { get; set; }
    public bool Opened { get; set; }
    public string? PhotoPath { get; set; }
    
    public Guid? CategoryId { get; set; }
}