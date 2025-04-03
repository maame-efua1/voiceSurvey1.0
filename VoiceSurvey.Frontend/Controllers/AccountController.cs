using Microsoft.AspNetCore.Mvc;
using VoiceSurvey.Frontend.Interfaces;
using VoiceSurvey.Frontend.Models;

public class AccountController : Controller
{
    private readonly IAuthService _authService;

    public AccountController(IAuthService authService)
    {
        _authService = authService;
    }

    // Register action
    [HttpPost]
    public async Task<IActionResult> Register(Register model)
    {
        if (ModelState.IsValid)
        {
            var response = await _authService.RegisterAsync(model);
            return RedirectToAction("Login");
        }

        return View(model);
    }

    // Login action
    [HttpPost]
    public async Task<IActionResult> Login(Login model)
    {
        if (ModelState.IsValid)
        {
            var response = await _authService.LoginAsync(model);
            return RedirectToAction("Index", "Dashboard");
        }

        return View(model);
    }

    // Logout action
    public async Task<IActionResult> Logout()
    {
        var response = await _authService.LogoutAsync();
        return RedirectToAction("Index", "Home");
    }
}
