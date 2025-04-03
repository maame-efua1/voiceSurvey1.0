using Microsoft.AspNetCore.Identity;
using System;

namespace VoiceSurvey.API.Models;

public class Register : IdentityUser
{

    public string Password { get; set; }

    public string ConfirmPassword { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Gender { get; set; }

    public string Region { get; set; }

    public string City { get; set; }

    public DateTime DateOfBirth { get; set; }

    public int Age { get; set; }

}
