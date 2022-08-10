using Sieve.Attributes;

namespace Application.Responses.Base;

public class Response
{
    [Sieve(CanFilter = true)]
    public Guid Id { get; set; }
}