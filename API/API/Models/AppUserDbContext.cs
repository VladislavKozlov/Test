using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace API.Models
{
    public class AppUserDbContext : IdentityDbContext
    {
        public DbSet<AppUser> AppUsers { get; set; }

        public AppUserDbContext(DbContextOptions<DAL.ApplicationDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}