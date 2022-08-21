using Core.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Context.Configuration;

public class ContactsConfiguration : IEntityTypeConfiguration<Contacts>
{
    public void Configure(EntityTypeBuilder<Contacts> builder)
    {
        builder.ToTable("CONTACTS");

        builder.HasData(new Contacts()
        {
            Id = Guid.NewGuid(),
            City = "Венев",
            Street = "ул. Бундурина, д. 7",
            Schedule = "с 9:00 до 19:00",
            Phone = "+7 (915) 788-12-21"
        });
    }
}