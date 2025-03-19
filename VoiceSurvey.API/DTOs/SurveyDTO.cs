namespace VoiceSurvey.API.DTOs;

public partial class SurveyDTO
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int CreatedBy { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual AspNetUserDTO CreatedByNavigation { get; set; } = null!;

}
