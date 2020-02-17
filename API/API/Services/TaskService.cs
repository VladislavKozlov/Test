using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class TaskService : ITaskService
    {
        private ITodoDbContext _dbContext;

        public TaskService(ITodoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<TodoCard> Get(int id)
        {
            return await _dbContext.Tasks.FirstOrDefaultAsync(p => p.Id == id);
        }

        public List<TodoCard> GetTasks()
        {
            return _dbContext.Tasks.ToList();
        }

        public async Task Add(TodoCard todoCard)
        {
            _dbContext.Tasks.Add(todoCard);
            await _dbContext.SaveChangesAsync();

        }

        public async Task Edit(TodoCard todoCard)
        {
            TodoCard todoCardToUpdate = await _dbContext.Tasks.FirstOrDefaultAsync(p => p.Id == todoCard.Id);
            todoCardToUpdate.TaskName = todoCard.TaskName;
            todoCardToUpdate.Description = todoCard.Description;
            todoCardToUpdate.Status = todoCard.Status;
            await _dbContext.SaveChangesAsync();
        }

        public async Task Remove(int id)
        {
            TodoCard todoCard = await _dbContext.Tasks.FirstOrDefaultAsync(p => p.Id == id);
            _dbContext.Tasks.Remove(todoCard);
            await _dbContext.SaveChangesAsync();
        }
    }
}
