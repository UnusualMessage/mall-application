using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Infrastructure.Context;

public class ApplicationContextFactory : IDesignTimeDbContextFactory<ApplicationContext>
{
    public ApplicationContext CreateDbContext(string[] args)
    {
        DbContextOptionsBuilder optionsBuilder = new();

        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=venev;Username=postgres;Password=20102001");

        return new ApplicationContext(optionsBuilder.Options);
    }
}