using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Context.Configuration;

public class RoutesConfiguration : IEntityTypeConfiguration<Route>
{
    public void Configure(EntityTypeBuilder<Route> builder)
    {
        builder.ToTable("ROUTES");
        
        builder
            .HasOne<Shop>()
            .WithOne(e => e.Route)
            .HasForeignKey<Shop>(e => e.RouteId);
        
        builder
            .HasOne<Event>()
            .WithOne(e => e.Route)
            .HasForeignKey<Event>(e => e.RouteId);
        
        builder
            .HasOne<Discount>()
            .WithOne(e => e.Route)
            .HasForeignKey<Discount>(e => e.RouteId);
        
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