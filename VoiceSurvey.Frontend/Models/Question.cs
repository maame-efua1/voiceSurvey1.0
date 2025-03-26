using System;
using System.Collections.Generic;

namespace VoiceSurvey.Frontend.Models;

public partial class Question
{
    public int Id { get; set; }

    public int SurveyId { get; set; }

    public string QuestionText { get; set; } = null!;

    public string? QuestionType { get; set; }

    public virtual ICollection<Option> Options { get; set; } = new List<Option>();

    public virtual ICollection<Response> Responses { get; set; } = new List<Response>();

    public virtual Survey Survey { get; set; } = null!;
}
