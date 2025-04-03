using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using VoiceSurvey.Frontend.Interfaces;
using VoiceSurvey.Frontend.Models;

namespace VoiceSurvey.Frontend.Services;


public class AuthService : IAuthService
{
    private readonly HttpClient _httpClient;

    public AuthService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    // Register method
    public async Task<string> RegisterAsync(Register model)
    {
        var content = new StringContent(JsonSerializer.Serialize(model), Encoding.UTF8, "application/json");
        var response = await _httpClient.PostAsync("api/auth/register", content);

        if (response.IsSuccessStatusCode)
        {
            var result = await response.Content.ReadAsStringAsync();
            return result;
        }

        return "Registration failed";
    }

    // Login method
    public async Task<string> LoginAsync(Login model)
    {
        var content = new StringContent(JsonSerializer.Serialize(model), Encoding.UTF8, "application/json");
        var response = await _httpClient.PostAsync("api/auth/login", content);

        if (response.IsSuccessStatusCode)
        {
            var result = await response.Content.ReadAsStringAsync();
            return result;
        }

        return "Login failed";
    }

    // Logout method
    public async Task<string> LogoutAsync()
    {
        var response = await _httpClient.PostAsync("api/Auth/logout", null);

        if (response.IsSuccessStatusCode)
        {
            return "Logout successful";
        }

        return "Logout failed";
    }
}

