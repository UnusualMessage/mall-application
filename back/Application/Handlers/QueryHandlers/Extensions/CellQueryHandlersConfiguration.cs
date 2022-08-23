using Application.Handlers.QueryHandlers.CellHandlers;
using Application.Requests.Queries.Cell;
using Application.Responses;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Handlers.QueryHandlers.Extensions;

public static class CellQueryHandlersConfiguration
{
    public static void AddCellQueryHandlers(this IServiceCollection services)
    {
        services.AddScoped<IRequestHandler<GetSievedCells, IEnumerable<CellResponse>>, 
            GetSievedCellsHandler>();
    }
}