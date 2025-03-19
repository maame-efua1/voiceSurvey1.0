namespace VoiceSurvey.API.DTOs;

public partial class QuestionDTO
{
    public int Id { get; set; }

    public int SurveyId { get; set; }

    public string QuestionText { get; set; } = null!;

    public string? QuestionType { get; set; }

    public virtual SurveyDTO Survey { get; set; } = null!;
}
