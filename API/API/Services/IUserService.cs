using API.DAL;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IUserService
    {
        Task<AppUser> GetByEmail(string email);
        Task<AppUser> GetById(string id);
        Task<bool> CreateUser(RegisterModel appUser);
        PasswordVerificationResult CheckPassword(string passwordHash, string password);
    }
}
