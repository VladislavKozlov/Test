using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Models
{
    public interface ITodoDbContext
    {
        DbSet<TodoCard> Tasks { get; set; }
        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
