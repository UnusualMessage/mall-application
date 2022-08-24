﻿using Core.Entities;

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
            .HasForeignKey<Shop>(e => e.CellId);

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

        builder
            .HasOne(e => e.Category)
            .WithMany(e => e.Shops)
            .HasForeignKey(e => e.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);
        
        
    }
}