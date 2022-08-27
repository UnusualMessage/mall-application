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
            .HasMany(e => e.ShopsWithLogos)
            .WithOne(e => e.Image)
            .HasForeignKey(e => e.ImageId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.ShopsWithGallery)
            .WithMany(e => e.Gallery);

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