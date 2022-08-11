using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Context.Configuration;

public class RoutesConfiguration : IEntityTypeConfiguration<Route>
{
    public void Configure(EntityTypeBuilder<Route> builder)
    {
        builder.ToTable("ROUTES");
        
        builder.HasData(new Route[]
        {
            new()
            {
                Id = Guid.NewGuid(),
                Path = "/"
            },
            
            new()
            {
                Id = Guid.NewGuid(),
                Path = "/shops"
            },
            
            new()
            {
                Id = Guid.NewGuid(),
                Path = "/discounts"
            },
            
            new()
            {
                Id = Guid.NewGuid(),
                Path = "/events"
            },
            
            new()
            {
                Id = Guid.NewGuid(),
                Path = "/map"
            },
            
            new()
            {
                Id = Guid.NewGuid(),
                Path = "/info"
            },
        });
    }
}