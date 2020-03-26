using API.Auth;
using API.DAL;
using API.Helpers;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly IUserService _userService;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;
        public readonly IPasswordHasher<AppUser> _passwordHasher;

        public AccountController(IUserService userService, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions, IPasswordHasher<AppUser> passwordHasher)
        {
            _userService = userService;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
            _passwordHasher = passwordHasher;
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return await Task.FromResult<ClaimsIdentity>(null);
            }
            var emailToVerify = await _userService.GetByEmail(email);
            var checkPassword = _passwordHasher.VerifyHashedPassword(null, emailToVerify.Password, password);
            if (checkPassword == 0)
            {
                return await Task.FromResult<ClaimsIdentity>(null);
            }
            else
            {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(email, emailToVerify.Id));
            }
        }

        [HttpPost]
        public async Task<ActionResult> Login([FromBody] AppUser model)
        {
            if (ModelState.IsValid)
            {
                var identity = await GetClaimsIdentity(model.Email, model.Password);
                if (identity != null)
                {
                    var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, model.Email, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });
                    return new OkObjectResult(jwt);
                }
            }
            return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
        }

        [HttpPost]
        public async Task<ActionResult> Register([FromBody] AppUser model)
        {
            if (ModelState.IsValid)
            {
                AppUser appUser = await _userService.GetByEmail(model.Email);
                if (appUser == null)
                {
                    var hashedPassword = _passwordHasher.HashPassword(null, model.Password);
                    await _userService.Add(new AppUser { UserName = model.Email, Email = model.Email, Password = hashedPassword });
                    return Json("Account created");
                }
            }
            return BadRequest(Errors.AddErrorToModelState("Register_failure", "Email is already in use.", ModelState));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var user = await _userService.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Json(user.UserName);
        }
    }
}
