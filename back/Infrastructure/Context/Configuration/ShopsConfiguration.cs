using Core.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Context.Configuration;

public class ShopsConfiguration : IEntityTypeConfiguration<Shop>
{
    public void Configure(EntityTypeBuilder<Shop> builder)
    {
        builder.ToTable("SHOPS");

        builder
            .HasOne(e => e.Cell)
            .WithOne(e => e.Shop)
            .HasForeignKey<Shop>(e => e.CellId)
            .OnDelete(DeleteBehavior.SetNull);

        builder
            .HasMany(e => e.Discounts)
            .WithOne(e => e.Shop)
            .HasForeignKey(e => e.ShopId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasMany(e => e.Events)
            .WithOne(e => e.Shop)
            .HasForeignKey(e => e.ShopId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}