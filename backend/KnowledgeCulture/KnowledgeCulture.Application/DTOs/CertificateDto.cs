namespace KnowledgeCulture.Application.DTOs;

public class CertificateDto
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid CourseId { get; set; }

    public string CourseTitle { get; set; }
        = string.Empty;

    public string CertificateNumber { get; set; }
        = string.Empty;

    public DateTime IssuedAt { get; set; }
}