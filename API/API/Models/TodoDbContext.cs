using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace API.Models
{
    public class TodoDbContext : DbContext, ITodoDbContext  //, IEnumerable, IDbAsyncEnumerable<TodoCard>
    {
        public virtual DbSet<TodoCard> Tasks { get; set; }

        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
        {
        }

        /*
        public IDbAsyncEnumerator GetAsyncEnumerator()
        {
            return GetAsyncEnumerator();
        }

        IDbAsyncEnumerator<TodoCard> IDbAsyncEnumerable<TodoCard>.GetAsyncEnumerator()
        {
            return new TodoDbContextEnumerator<TodoCard>(this.GetEnumerator());
        }

        public IEnumerator GetEnumerator()
        {
            return ((IEnumerable)Tasks).GetEnumerator();
        }

        private class TodoDbContextEnumerator<T> : IDbAsyncEnumerator<TodoCard>
        {
            private object p;

            public TodoDbContextEnumerator(object p)
            {
                this.p = p;
            }

            public TodoCard Current => throw new System.NotImplementedException();

            object IDbAsyncEnumerator.Current => throw new System.NotImplementedException();

            public void Dispose()
            {
                throw new System.NotImplementedException();
            }

            public Task<bool> MoveNextAsync(CancellationToken cancellationToken)
            {
                throw new System.NotImplementedException();
            }
        }
        */
    }
}
