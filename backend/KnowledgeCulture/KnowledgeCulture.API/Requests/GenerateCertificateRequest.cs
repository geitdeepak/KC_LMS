namespace KnowledgeCulture.API.Requests;

public class GenerateCertificateRequest
{
    public Guid UserId { get; set; }

    public Guid CourseId { get; set; }
}