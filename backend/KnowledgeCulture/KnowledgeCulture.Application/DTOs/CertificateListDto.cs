namespace KnowledgeCulture.Application.DTOs;

public class CertificateListDto
{
    public Guid Id { get; set; }

    public Guid CourseId { get; set; }

    public string CourseTitle { get; set; }
        = string.Empty;

    public string CertificateNumber { get; set; }
        = string.Empty;

    public DateTime IssuedAt { get; set; }
}