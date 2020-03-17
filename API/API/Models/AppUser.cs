using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class AppUser : IdentityUser
    {
        public override string Email { get; set; }
        public string Password { get; set; }
    }
}
