using Core.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Context.Configuration;

public class DiscountsConfiguration : IEntityTypeConfiguration<Discount>
{
    public void Configure(EntityTypeBuilder<Discount> builder)
    {
        builder.ToTable("DISCOUNTS");
        
        builder
            .HasOne(e => e.Shop)
            .WithMany(e => e.Discounts)
            .HasForeignKey(e => e.ShopId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}