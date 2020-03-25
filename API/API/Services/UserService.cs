using API.DAL;
using DAL;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Services
{
    public class UserService : IUserService
    {
        private ApplicationDbContext _dbContext;

        public UserService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<AppUser> GetByEmail(string email)
        {
            AppUser appUser = await _dbContext.AspNetUsers.FirstOrDefaultAsync(u => u.Email == email);
            return appUser;
        }

        public async Task<AppUser> GetById(string id)
        {
            AppUser appUser = await _dbContext.AspNetUsers.FirstOrDefaultAsync(u => u.Id == id);
            return appUser;
        }

        public async Task<string> Add(AppUser appUser)
        {
            _dbContext.AspNetUsers.Add(appUser);
            await _dbContext.SaveChangesAsync();
            return appUser.Id;
        }
    }
}
