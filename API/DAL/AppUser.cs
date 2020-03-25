using Microsoft.AspNetCore.Identity;

namespace API.DAL
{
    public class AppUser : IdentityUser
    {
        public override string Email { get; set; }
        public string Password { get; set; }
    }
}
