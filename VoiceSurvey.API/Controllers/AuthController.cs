using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VoiceSurvey.API.Models;
using System;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly IConfiguration _configuration;

    public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    // REGISTER
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = new IdentityUser 
        { 
            UserName = model.Email, 
            Email = model.Email 
        };
        var result = await _userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded) return BadRequest(result.Errors);

        return Ok(new { Message = "User registered successfully" });
    }

    // LOGIN
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null) return Unauthorized(new { Message = "Invalid login attempt" });

        var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);
        if (!result.Succeeded) return Unauthorized(new { Message = "Invalid login attempt" });

        // Generate JWT token
        var token = GenerateJwtToken(user);

        return Ok(new 
        { 
            Message = "Login successful",
            Token = token
        });
    }

    // LOGOUT
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok(new { Message = "Logged out successfully" });
    }

    // GENERATE JWT TOKEN
    private string GenerateJwtToken(IdentityUser user)
    {
        var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:Secret"]);
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id)
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:Issuer"],
            audience: _configuration["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
