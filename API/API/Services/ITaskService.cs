using API.Models;
using System.Collections.Generic;

namespace API.Services
{
    public interface ITaskService
    {
        List<TodoCard> GetTasks();
        void Add(TodoCard todoCard);
        void Edit(TodoCard todoCard);
        void Remove(int id);
        TodoCard Get(int id);
    }
}
