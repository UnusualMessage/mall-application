using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Context.Configuration;

public class CellConfiguration : IEntityTypeConfiguration<Cell>
{
    private const short FirstFloorCellsCount = 23;
    private const short SecondFloorCellsCount = 6;
    
    public void Configure(EntityTypeBuilder<Cell> builder)
    {
        builder.ToTable("СELLS");

        IList<Cell> cells = new List<Cell>();
        
        for (var i = 0; i < FirstFloorCellsCount; ++i)
        {
            cells.Add(new()
            {
                Id = Guid.NewGuid(),
                Number = (short)(i + 1),
                Floor = 1
            });
        }
        
        for (var i = FirstFloorCellsCount; i < FirstFloorCellsCount + SecondFloorCellsCount; ++i)
        {
            cells.Add(new()
            {
                Id = Guid.NewGuid(),
                Number = (short)(i + 1),
                Floor = 2
            });
        }

        builder.HasData(cells);
    }
}