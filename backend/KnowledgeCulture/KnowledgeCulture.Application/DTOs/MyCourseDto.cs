namespace KnowledgeCulture.Application.DTOs;

public class MyCourseDto
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public string Level { get; set; } = string.Empty;

    public string ThumbnailUrl { get; set; } = string.Empty;

    public decimal Progress { get; set; }

    public int CompletedLessons { get; set; }

    public int TotalLessons { get; set; }

    public bool IsCompleted { get; set; }

    public bool CertificateEarned { get; set; }

    public string LastLessonTitle { get; set; } = string.Empty;

    public DateTime EnrolledAt { get; set; }
}