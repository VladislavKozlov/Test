using API.Enums;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

/*
 * 
 * @author Vladislav Kozlov <k2v.akosa@gmail.com>
*/
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : Controller
    {
        private readonly TodoDbContext _db;

        public TasksController(TodoDbContext todoDbContext)
        {
            _db = todoDbContext;
        }

        // GET api/tasks/5
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var todoCard = _db.Tasks.SingleOrDefault(a => a.Id == id);
            if (todoCard == null)
            {
                return null;
            }
            return Json(new
            {
                todoCard
            });
        }

        // GET api/tasks
        [HttpGet]
        public JsonResult GetAllCards()
        {
            var cards = _db.Tasks.ToList();
            List<TodoCard> cardsTodo = new List<TodoCard>();
            List<TodoCard> cardsInProgress = new List<TodoCard>();
            List<TodoCard> cardsDone = new List<TodoCard>();
            foreach (var card in cards)
            {
                if (card.Status == (int)TaskType.Todo)
                {
                    TodoCard cardTodo = new TodoCard();
                    cardTodo.Id = card.Id;
                    cardTodo.TaskName = card.TaskName;
                    cardTodo.Description = card.Description;
                    cardTodo.Status = card.Status;
                    cardsTodo.Add(cardTodo);
                }
                if (card.Status == (int)TaskType.InProgress)
                {
                    TodoCard cardInProgress = new TodoCard();
                    cardInProgress.Id = card.Id;
                    cardInProgress.TaskName = card.TaskName;
                    cardInProgress.Description = card.Description;
                    cardInProgress.Status = card.Status;
                    cardsInProgress.Add(cardInProgress);
                }
                if (card.Status == (int)TaskType.Done)
                {
                    TodoCard cardDone = new TodoCard();
                    cardDone.Id = card.Id;
                    cardDone.TaskName = card.TaskName;
                    cardDone.Description = card.Description;
                    cardDone.Status = card.Status;
                    cardsDone.Add(cardDone);
                }
            }

            return Json(new
            {
                cardsTodo,
                cardsInProgress,
                cardsDone
            });
        }

        // POST api/tasks
        [HttpPost]
        public int Create(TodoCard todoCard)
        {
            TodoCard todoCardNew = new TodoCard();
            todoCardNew.TaskName = todoCard.TaskName;
            todoCardNew.Description = todoCard.Description;
            todoCardNew.Status = todoCard.Status;
            _db.Tasks.Add(todoCardNew);
            _db.SaveChanges();

            return todoCardNew.Id;
        }

        // PUT api/tasks/5
        [HttpPut("{id}")]
        public void Update(int id, TodoCard todoCard)
        {
            if (id != todoCard.Id)
            {
                return;
            }
            _db.Entry(todoCard).State = EntityState.Modified;
            try
            {
                _db.SaveChanges();
            }
            catch (Exception)
            {
            }
        }

        // DELETE api/tasks/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var todoCard = _db.Tasks.SingleOrDefault(a => a.Id == id);
            if (todoCard == null)
            {
                return;
            }
            _db.Tasks.Remove(todoCard);
            _db.SaveChanges();
        }
    }
}
