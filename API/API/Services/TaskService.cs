using API.Models;
using API.Repositories;
using System.Collections.Generic;

namespace API.Services
{
    public class TaskService : ITaskService
    {
        private ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public TodoCard Get(int id)
        {
            var todoCard = _taskRepository.Get(id);
            return todoCard;
        }

        public List<TodoCard> GetTasks()
        {
            var tasks = _taskRepository.GetTasks();
            return tasks;
        }

        public void Add(TodoCard todoCard)
        {
            _taskRepository.Add(todoCard);
        }

        public void Edit(TodoCard todoCard)
        {
            TodoCard todoCardToUpdate = _taskRepository.Get(todoCard.Id);
            todoCardToUpdate.TaskName = todoCard.TaskName;
            todoCardToUpdate.Description = todoCard.Description;
            todoCardToUpdate.Status = todoCard.Status;
            _taskRepository.Save();
        }

        public void Remove(int id)
        {
            TodoCard todoCard = _taskRepository.Get(id);
            _taskRepository.Remove(todoCard);
        }
    }
}
