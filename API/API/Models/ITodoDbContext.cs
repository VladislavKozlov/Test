using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public interface ITodoDbContext
    {
        DbSet<TodoCard> Tasks { get; set; }
        int SaveChanges();
    }
}
