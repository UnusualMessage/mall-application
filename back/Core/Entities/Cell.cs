using System.ComponentModel.DataAnnotations.Schema;
using Core.Entities.Base;

namespace Core.Entities;

public class Cell : Entity
{
    public short Number { get; set; }
    public short Floor { get; set; }
    
    public Guid? ShopId { get; set; }
    [ForeignKey("ShopId")]
    public Shop? Shop { get; set; }
}