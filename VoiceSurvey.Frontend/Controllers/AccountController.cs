using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VoiceSurvey.Frontend.Models;

public class AccountController : Controller
{
    private readonly IHttpClientFactory _httpClientFactory;

    [ActivatorUtilitiesConstructor]
    public AccountController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;

    }


    [HttpPost]
    public async Task<IActionResult> Login(string email, string password)
    {
        var loginData = new User
        {
            Email = email,
            Password = password
        };
        Console.WriteLine("Login Data: " + loginData);
        string jsonData = JsonConvert.SerializeObject(loginData);
        var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

        var client = _httpClientFactory.CreateClient(); 
        HttpResponseMessage response = await client.PostAsync("http://localhost:5091/api/Auth/login", content);

        if (response.IsSuccessStatusCode)
        {
            string responseData = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<User>(responseData);

            // Store the token in session or cookie
            HttpContext.Session.SetString("AuthToken", result.Token);

Console.WriteLine("Token: " + result.Token);
            return RedirectToAction("Index", "Dashboard");
        }
        
        ViewBag.Error = "Invalid login credentials";
        return View();
    }
}