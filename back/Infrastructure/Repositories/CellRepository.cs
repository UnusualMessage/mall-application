using Core.Entities;
using Core.Interfaces.Repositories;
using Infrastructure.Context;
using Infrastructure.Repositories.Base;

namespace Infrastructure.Repositories;

public class CellRepository : Repository<Cell>, ICellRepository
{
    public CellRepository(ApplicationContext applicationContext) : base(applicationContext)
    {
    }

    public override async Task<Cell?> UpdateAsync(Cell entity)
    {
        return await GetByIdAsync(entity.Id);
    }
}