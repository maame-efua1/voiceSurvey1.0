using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace VoiceSurvey.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users.AsNoTracking().ToListAsync();
            return Ok(users);
        }

        [Authorize]
        [HttpGet("GetUserById/{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("AddRole")]
        public async Task<IActionResult> AddRole([FromBody] string roleName)
        {
            if (string.IsNullOrWhiteSpace(roleName))
                return BadRequest(new { message = "Role name cannot be empty" });

            if (await _roleManager.RoleExistsAsync(roleName))
                return BadRequest(new { message = "Role already exists" });

            var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = $"Role '{roleName}' created successfully" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("AssignRole/{userId}")]
        public async Task<IActionResult> AssignRole(string userId, [FromBody] string roleName)
        {
            if (string.IsNullOrWhiteSpace(roleName))
                return BadRequest(new { message = "Role name cannot be empty" });

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound(new { message = "User not found" });

            if (!await _roleManager.RoleExistsAsync(roleName))
                return BadRequest(new { message = "Role does not exist" });

            var result = await _userManager.AddToRoleAsync(user, roleName);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = $"Role '{roleName}' assigned to user {user.UserName}" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("RemoveRole/{userId}")]
        public async Task<IActionResult> RemoveRole(string userId, [FromBody] string roleName)
        {
            if (string.IsNullOrWhiteSpace(roleName))
                return BadRequest(new { message = "Role name cannot be empty" });

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound(new { message = "User not found" });

            var result = await _userManager.RemoveFromRoleAsync(user, roleName);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = $"Role '{roleName}' removed from user {user.UserName}" });
        }

        [Authorize]
        [HttpGet("GetUserRoles/{userId}")]
        public async Task<IActionResult> GetUserRoles(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound(new { message = "User not found" });

            var roles = await _userManager.GetRolesAsync(user);
            return Ok(new { user = user.UserName, roles });
        }

        [Authorize]
        [HttpDelete("DeleteUser/{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound(new { message = "User not found" });

            // Remove user from all roles before deleting
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                await _userManager.RemoveFromRoleAsync(user, role);
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = $"User {user.UserName} deleted successfully" });
        }
    }
}