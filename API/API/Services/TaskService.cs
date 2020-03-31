using DAL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Services
{
    public class TaskService : ITaskService
    {
        private ApplicationDbContext _dbContext;

        public TaskService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<TodoCard> Get(int id)
        {
            return await _dbContext.Tasks.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<TodoCard>> GetTasks()
        {
            return await _dbContext.Tasks.ToListAsync();
        }

        public async Task<int> Add(TodoCard todoCard)
        {
            todoCard.CreateDate = DateTime.Now;
            _dbContext.Tasks.Add(todoCard);
            await _dbContext.SaveChangesAsync();
            return todoCard.Id;
        }

        public async Task<TodoCard> Edit(TodoCard todoCard)
        {
            TodoCard todoCardToUpdate = await _dbContext.Tasks.FirstOrDefaultAsync(p => p.Id == todoCard.Id);
            todoCardToUpdate.TaskName = todoCard.TaskName;
            todoCardToUpdate.Description = todoCard.Description;
            todoCardToUpdate.Status = todoCard.Status;
            await _dbContext.SaveChangesAsync();
            return await _dbContext.Tasks.FirstOrDefaultAsync(p => p.Id == todoCard.Id);
        }

        public async Task Remove(int id)
        {
            TodoCard todoCard = await _dbContext.Tasks.FirstOrDefaultAsync(p => p.Id == id);
            _dbContext.Tasks.Remove(todoCard);
            await _dbContext.SaveChangesAsync();
        }
    }
}
