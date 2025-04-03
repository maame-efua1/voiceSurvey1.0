using System;
using VoiceSurvey.Frontend.Models;

namespace VoiceSurvey.Frontend.Interfaces;

public interface IAuthService
{
    Task<string> RegisterAsync(Register model);

    Task<string> LoginAsync(Login model);

    Task<string> LogoutAsync();
}
