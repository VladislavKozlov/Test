using Microsoft.EntityFrameworkCore;

/*
 * 
 * @author Vladislav Kozlov <k2v.akosa@gmail.com>
*/
namespace API.Models
{
    public class TodoDbContext : DbContext
    {
        public virtual DbSet<TodoCard> Tasks { get; set; }

        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
        {
        }
    }
}
