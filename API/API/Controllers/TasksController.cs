using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : Controller
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var сard = await _taskService.Get(id);
            if (сard == null)
            {
                return NotFound();
            }
            return Json(сard);
        }

        [HttpGet]
        public JsonResult GetAllCards()
        {
            var cards = _taskService.GetTasks();
            return Json(cards);
        }

        [HttpPost]
        public int Create(TodoCard todoCard)
        {
            _taskService.Add(todoCard);
            return todoCard.Id;
        }

        [HttpPut("{id}")]
        public void Update(TodoCard todoCard)
        {
            _taskService.Edit(todoCard);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _taskService.Remove(id);
        }
    }
}
