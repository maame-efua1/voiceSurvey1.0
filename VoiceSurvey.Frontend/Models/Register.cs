using Microsoft.AspNetCore.Identity;
using System;

namespace VoiceSurvey.Frontend.Models;

public class Register : IdentityUser
{
    public string Email { get; set; }

    public string Password { get; set; }

    public string ConfirmPassword { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string UserName { get; set; }

    public string PhoneNumber { get; set; }

    public string Gender { get; set; }

    public string Region { get; set; }

    public string City { get; set; }

    public DateTime DateOfBirth { get; set; }

    public int Age { get; set; }

}
