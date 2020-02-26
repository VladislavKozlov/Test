using API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Services
{
    public interface ITaskService
    {
        List<TodoCard> GetTasks();
        Task<int> Add(TodoCard todoCard);
        Task<TodoCard> Edit(TodoCard todoCard);
        void Remove(int id);
        Task<TodoCard> Get(int id);
    }
}
