namespace VoiceSurvey.API.DTOs;

public partial class AspNetUserRoleDTO
{
    public int UserId { get; set; }

    public int RoleId { get; set; }

    public virtual AspNetRoleDTO Role { get; set; } = null!;

    public virtual AspNetUserDTO User { get; set; } = null!;
}
