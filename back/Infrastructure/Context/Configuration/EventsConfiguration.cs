using Core.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Context.Configuration;

public class EventsConfiguration : IEntityTypeConfiguration<Event>
{
    public void Configure(EntityTypeBuilder<Event> builder)
    {
        builder.ToTable("EVENTS");

        builder
            .HasOne(e => e.Shop)
            .WithMany(e => e.Events)
            .HasForeignKey(e => e.ShopId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}