using Core.Entities.Base;

namespace Core.Entities;

public class Cell : Entity
{
    public short Number { get; set; }
    public short Floor { get; set; }
    
    public Shop? Shop { get; set; }
}