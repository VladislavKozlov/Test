using API.Models;
using System.Collections.Generic;
using System.Linq;

namespace API.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private ITodoDbContext _dbContext;

        public TaskRepository(ITodoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public TodoCard Get(int id)
        {
            return _dbContext.Tasks.FirstOrDefault(p => p.Id == id);
        }

        public List<TodoCard> GetTasks()
        {
            return _dbContext.Tasks.ToList();
        }

        public void Add(TodoCard todoCard)
        {
            _dbContext.Tasks.Add(todoCard);
            _dbContext.SaveChanges();
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public void Remove(TodoCard todoCard)
        {
            _dbContext.Tasks.Remove(todoCard);
            _dbContext.SaveChanges();
        }
    }
}
