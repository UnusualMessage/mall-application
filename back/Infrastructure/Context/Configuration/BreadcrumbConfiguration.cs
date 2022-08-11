﻿using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Context.Configuration;

public class BreadcrumbConfiguration : IEntityTypeConfiguration<Breadcrumb>
{
    public void Configure(EntityTypeBuilder<Breadcrumb> builder)
    {
        builder.ToTable("BREADCRUMBS");

        builder.HasData(new Breadcrumb[]
        {
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Главная",
                Link = "/"
            },
            
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Магазины",
                Link = "shops"
            },
            
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Акции и скидки",
                Link = "discounts"
            },
            
            new()
            {
                Id = Guid.NewGuid(),
                Name = "События и новости",
                Link = "events"
            },
            
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Карта ТЦ",
                Link = "map"
            },
            
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Информация",
                Link = "info"
            },
        });
    }
}