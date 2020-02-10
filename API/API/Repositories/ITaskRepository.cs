using API.Models;
using System.Collections.Generic;

namespace API.Repositories
{
    public interface ITaskRepository
    {
        List<TodoCard> GetTasks();
        void Add(TodoCard todoCard);
        void Save();
        void Remove(TodoCard todoCard);
        TodoCard Get(int id);
    }
}
