using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class TodoDbContext : DbContext, ITodoDbContext 
    {
        public virtual DbSet<TodoCard> Tasks { get; set; }

        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
        {
        }
    }
}
