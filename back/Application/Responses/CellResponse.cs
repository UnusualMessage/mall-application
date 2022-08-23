using Application.Responses.Base;
using Sieve.Attributes;

namespace Application.Responses;

public class CellResponse : Response
{
    public short Number { get; set; }
    
    [Sieve(CanFilter = true)]
    public short Floor { get; set; }
    
    public ShopResponse Shop { get; set; }
}