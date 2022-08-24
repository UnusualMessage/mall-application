using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Context.Configuration;

public class ImagesConfiguration : IEntityTypeConfiguration<Image>
{
    public void Configure(EntityTypeBuilder<Image> builder)
    {
        builder.ToTable("IMAGES");

        builder
            .HasMany<Shop>()
            .WithOne(e => e.Image)
            .HasForeignKey(e => e.ImageId);
        
        builder
            .HasMany<Event>()
            .WithOne(e => e.Image)
            .HasForeignKey(e => e.ImageId);
        
        builder
            .HasMany<Discount>()
            .WithOne(e => e.Image)
            .HasForeignKey(e => e.ImageId);
    }
}