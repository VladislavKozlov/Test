using API.DAL;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace API.Services
{
    public class UserService : IUserService
    {
        public readonly UserManager<AppUser> _userManager;
        public readonly IPasswordHasher<AppUser> _passwordHasher;

        public UserService(UserManager<AppUser> userManager, IPasswordHasher<AppUser> passwordHasher)
        {
            _userManager = userManager;
            _passwordHasher = passwordHasher;
        }

        public PasswordVerificationResult CheckPassword(string passwordHash, string password)
        {
            return _passwordHasher.VerifyHashedPassword(null, passwordHash, password);
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

        public async Task<bool> CreateUser(RegisterModel registerModel)
        {
            var hashedPassword = _passwordHasher.HashPassword(null, registerModel.Password);
            var user = new AppUser { UserName = registerModel.Email, Email = registerModel.Email, PasswordHash = hashedPassword };
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
