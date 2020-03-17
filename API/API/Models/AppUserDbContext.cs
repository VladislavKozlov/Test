using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace API.Models
{
    public class AppUserDbContext : IdentityDbContext<AppUser>
    {
        public DbSet<AppUser> AspNetUsers { get; set; }

        public AppUserDbContext(DbContextOptions<AppUserDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}