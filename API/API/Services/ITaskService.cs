using API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Services
{
    public interface ITaskService
    {
        List<TodoCard> GetTasks();
        Task Add(TodoCard todoCard);
        Task Edit(TodoCard todoCard);
        Task Remove(int id);
        Task<TodoCard> Get(int id);
    }
}
