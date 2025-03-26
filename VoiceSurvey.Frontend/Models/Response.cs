using System;
using System.Collections.Generic;

namespace VoiceSurvey.Frontend.Models;

public partial class Response
{
    public int Id { get; set; }

    public int SurveyId { get; set; }

    public int QuestionId { get; set; }

    public string? UserId { get; set; }

    public string? TextResponse { get; set; }

    public byte[]? VoiceResponse { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Question Question { get; set; } = null!;

    public virtual Survey Survey { get; set; } = null!;
}
