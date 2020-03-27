using API.DAL;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace API.Services
{
    public class UserService : IUserService
    {
        public readonly UserManager<AppUser> _userManager;

        public UserService(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<AppUser> GetByEmail(string email)
        {
            var appUser = await _userManager.FindByNameAsync(email);
            return appUser;
        }

        public async Task<AppUser> GetById(string id)
        {
            var appUser = await _userManager.FindByIdAsync(id);
            return appUser;
        }

        public async Task<bool> CreateUser(AppUser appUser, string hashedPassword)
        {
            var user = new AppUser { UserName = appUser.Email, Email = appUser.Email, Password = hashedPassword };
            var result = await _userManager.CreateAsync(user);
            if (result.Succeeded)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
