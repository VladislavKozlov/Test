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
        public async Task<IActionResult> GetAllCards() //public JsonResult GetAllCards()
        {
            var cards = await _taskService.GetTasks();
            return Json(cards);
        }

        [HttpPost]
        public async Task<IActionResult> Create(TodoCard todoCard)
        {
            await _taskService.Add(todoCard);
            return Json(todoCard.Id);
        }

        [HttpPut]
        public async Task<IActionResult> Update(TodoCard todoCard)
        {
            await _taskService.Edit(todoCard);
            return Json(todoCard);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _taskService.Remove(id);
        }
    }
}
