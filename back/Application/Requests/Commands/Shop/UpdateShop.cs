using System.ComponentModel.DataAnnotations;
using Application.Requests.Commands.Social;
using Application.Responses;
using Core.Entities;
using MediatR;

namespace Application.Requests.Commands.Shop;

public class UpdateShop : IRequest<ShopResponse>
{
    [Required]
    public Guid Id { get; set; }
    
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Schedule { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Site { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;
    public string RoutePath { get; set; } = string.Empty;
    public short Floor { get; set; }
    public IEnumerable<UpdateSocial> Socials { get; set; } = new List<UpdateSocial>();

    public Guid ImageId { get; set; }
    public Guid CategoryId { get; set; }
    public Guid CellId { get; set; }
}