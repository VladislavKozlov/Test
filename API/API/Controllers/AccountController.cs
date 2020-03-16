using API.Helpers;
using API.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]   
    public class AccountController : Controller
    {
        private readonly AppUserDbContext _appUserDbContext;

        public AccountController(AppUserDbContext appUserDbContext)
        {
            _appUserDbContext = appUserDbContext;
        }

        [HttpPost]       
        public async Task<ActionResult> Login([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                AppUser appUser = await _appUserDbContext.AppUsers.FirstOrDefaultAsync(u => u.Email == model.Email && u.Password == model.Password);
                if (appUser != null)
                {
                    await Authenticate(model.Email);
                    return new OkObjectResult("Ok");
                }
            }
            return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
        }

        [HttpPost]        
        public async Task<ActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                AppUser appUser = await _appUserDbContext.AppUsers.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (appUser == null)
                {
                    _appUserDbContext.AppUsers.Add(new AppUser { Email = model.Email, Password = model.Password });
                    await _appUserDbContext.SaveChangesAsync();
                    await Authenticate(model.Email);

                    return new OkObjectResult("Account created");
                }
            }
            return BadRequest(Errors.AddErrorToModelState("Register_failure", "Invalid username or password.", ModelState));
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return new OkObjectResult("Logout");
        }

        private async Task Authenticate(string userName)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName)
            };
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }
    }
}
