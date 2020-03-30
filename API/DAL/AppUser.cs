using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DAL
{
    [Table("AspNetUsers")]
    public class AppUser : IdentityUser
    {
    }
}
