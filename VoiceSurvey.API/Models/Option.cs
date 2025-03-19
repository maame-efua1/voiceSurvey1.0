using System;
using System.Collections.Generic;

namespace VoiceSurvey.API.Models;

public partial class Option
{
    public int Id { get; set; }

    public int QuestionId { get; set; }

    public string OptionText { get; set; } = null!;

    public virtual Question Question { get; set; } = null!;
}
