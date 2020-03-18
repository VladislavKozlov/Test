﻿using API.Auth;
using API.Helpers;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly AppUserDbContext _appUserDbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;

        public AccountController(AppUserDbContext appUserDbContext, UserManager<AppUser> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _appUserDbContext = appUserDbContext;
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return await Task.FromResult<ClaimsIdentity>(null);
            }
            var emailToVerify = await _appUserDbContext.AspNetUsers.FirstOrDefaultAsync(x => x.Email == email && x.Password == password);
            if (emailToVerify == null)
            {
                return await Task.FromResult<ClaimsIdentity>(null);
            }
            else
            {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(email, emailToVerify.Id));
            }
        }

        [HttpPost]
        public async Task<ActionResult> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(model.Email, model.Password);
            if (identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }

            var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, model.Email, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });
            return new OkObjectResult(jwt);
        }

        [HttpPost]
        public async Task<ActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                AppUser appUser = await _appUserDbContext.AspNetUsers.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (appUser == null)
                {
                    _appUserDbContext.AspNetUsers.Add(new AppUser { UserName = model.Email, Email = model.Email, Password = model.Password });
                    await _appUserDbContext.SaveChangesAsync();                    
                    return Json("Account created");
                }
            }
            else
            {
                return BadRequest(Errors.AddErrorToModelState("Register_failure", "Invalid username or password.", ModelState));
            }
            return NoContent();
        }
    }
}