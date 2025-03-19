namespace VoiceSurvey.API.DTOs;

public partial class ResponseDTO
{
    public int Id { get; set; }

    public int SurveyId { get; set; }

    public int QuestionId { get; set; }

    public int UserId { get; set; }

    public string? TextResponse { get; set; }

    public byte[]? VoiceResponse { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual QuestionDTO Question { get; set; } = null!;

    public virtual SurveyDTO Survey { get; set; } = null!;

    public virtual AspNetUserDTO User { get; set; } = null!;
}
