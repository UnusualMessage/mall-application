using Core.Entities;

using Infrastructure.Context.Configuration;

using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context;

public class ApplicationContext : DbContext
{
    public DbSet<Contacts>? Contacts { get; set; }
    public DbSet<Social>? Socials { get; set; }
    public DbSet<Route>? Routes { get; set; }

    public DbSet<Shop>? Shops { get; set; }
    public DbSet<Event>? Events { get; set; }
    public DbSet<Discount>? Discounts { get; set; }

    public DbSet<Category>? Categories { get; set; }
    
    public DbSet<User>? Users { get; set; }
    public DbSet<RefreshToken>? RefreshTokens { get; set; }

    public ApplicationContext(DbContextOptions options) : base(options)
    {
            
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new ShopsConfiguration());
        modelBuilder.ApplyConfiguration(new EventsConfiguration());
        modelBuilder.ApplyConfiguration(new DiscountsConfiguration());

        modelBuilder.ApplyConfiguration(new UsersConfiguration());
        modelBuilder.ApplyConfiguration(new RefreshTokensConfiguration());

        modelBuilder.ApplyConfiguration(new CategoriesConfiguration());

        modelBuilder.ApplyConfiguration(new ContactsConfiguration());
        modelBuilder.ApplyConfiguration(new SocialsConfiguration());
        modelBuilder.ApplyConfiguration(new RoutesConfiguration());
    }
}