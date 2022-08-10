using Sieve.Models;

namespace Application.Requests.Queries.Base;

public abstract class SievedQuery
{
    public SieveModel SieveModel { get; }

    protected SievedQuery(SieveModel model)
    {
        SieveModel = model;
    }
}