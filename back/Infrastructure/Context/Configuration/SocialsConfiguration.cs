using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Core.Entities;

namespace Infrastructure.Context.Configuration;

public class SocialsConfiguration : IEntityTypeConfiguration<Social>
{
    public void Configure(EntityTypeBuilder<Social> builder)
    {
        builder.ToTable("SOCIALS");

        builder
            .HasOne(e => e.Shop)
            .WithMany(e => e.Socials)
            .OnDelete(DeleteBehavior.Cascade);
    }
}