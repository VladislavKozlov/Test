using API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Services
{
    public interface ITaskService
    {
        List<TodoCard> GetTasks();
        void Add(TodoCard todoCard);
        void Edit(TodoCard todoCard);
        void Remove(int id);
        Task<ActionResult<TodoCard>> Get(int id);
    }
}
