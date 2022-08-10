using Core.Entities;
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
            }
        });
    }
}