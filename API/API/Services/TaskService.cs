using API.Models;
using Microsoft.AspNetCore.Mvc;
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
            return await _dbContext.Tasks.FindAsync(id);
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

        public async void Edit(TodoCard todoCard)
        {
            TodoCard todoCardToUpdate = await _dbContext.Tasks.FindAsync(todoCard.Id);
            todoCardToUpdate.TaskName = todoCard.TaskName;
            todoCardToUpdate.Description = todoCard.Description;
            todoCardToUpdate.Status = todoCard.Status;
            _dbContext.SaveChanges();
        }

        public async void Remove(int id)
        {
            TodoCard todoCard = await _dbContext.Tasks.FindAsync(id);
            _dbContext.Tasks.Remove(todoCard);
            _dbContext.SaveChanges();          
        }
    }
}
