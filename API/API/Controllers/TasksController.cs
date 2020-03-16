using API.Services;
using DAL;
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
        public async Task<IActionResult> GetAllCards()
        {
            var cards = await _taskService.GetTasks();
            return Json(cards);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TodoCard todoCard)
        {
            await _taskService.Add(todoCard);            
            return Json(todoCard.Id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TodoCard todoCard)
        {
            var сard = await _taskService.Get(id);
            if (сard == null)
            {
                return NotFound();
            }
            todoCard.Id = id;
            await _taskService.Edit(todoCard);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _taskService.Remove(id);
            return NoContent();
        }
    }
}
