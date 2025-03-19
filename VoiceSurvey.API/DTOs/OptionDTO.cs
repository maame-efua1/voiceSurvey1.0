namespace VoiceSurvey.API.DTOs;

public partial class OptionDTO
{
    public int Id { get; set; }

    public int QuestionId { get; set; }

    public string OptionText { get; set; } = null!;

    public virtual QuestionDTO Question { get; set; } = null!;
}
