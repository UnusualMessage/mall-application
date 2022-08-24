using Core.Entities;
using Core.Interfaces.Repositories;
using Infrastructure.Context;
using Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CellRepository : Repository<Cell>, ICellRepository
{
    public CellRepository(ApplicationContext applicationContext) : base(applicationContext)
    {
    }
    public override async Task<Cell?> GetByIdAsync(Guid id)
    {
        return await ApplicationContext.Set<Cell>()
            
            .Include(e => e.Shop)
                .ThenInclude(e => e.Image)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Breadcrumb)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Route)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Socials)
            
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public override async Task<IEnumerable<Cell>> GetAllAsync()
    {
        return await ApplicationContext.Set<Cell>()
            
            .Include(e => e.Shop)
                .ThenInclude(e => e.Image)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Breadcrumb)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Route)
            .Include(e => e.Shop)
                .ThenInclude(e => e.Socials)
            
            .ToListAsync();
    }

    public override async Task<Cell?> UpdateAsync(Cell entity)
    {
        return await GetByIdAsync(entity.Id);
    }
}