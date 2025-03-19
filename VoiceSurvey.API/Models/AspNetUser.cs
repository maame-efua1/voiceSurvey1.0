using System;
using System.Collections.Generic;

namespace VoiceSurvey.API.Models;

public partial class AspNetUser
{
    public int Id { get; set; }

    public string? UserName { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Gender { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public string? ProfilePicture { get; set; }

    public string? Bio { get; set; }

    public string? Email { get; set; }

    public string? PasswordHash { get; set; }

    public string? SecurityStamp { get; set; }

    public string? ConcurrencyStamp { get; set; }

    public bool? LockoutEnabled { get; set; }

    public int? AccessFailedCount { get; set; }

    public virtual ICollection<Response> Responses { get; set; } = new List<Response>();

    public virtual ICollection<Survey> Surveys { get; set; } = new List<Survey>();
}
