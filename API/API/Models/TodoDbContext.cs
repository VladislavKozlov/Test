using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Models
{
    public class TodoDbContext : DbContext, ITodoDbContext
    {
        public virtual DbSet<TodoCard> Tasks { get; set; }

        public virtual async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }
        
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
        {
        }
    }
}
