namespace KnowledgeCulture.Application.DTOs;

public class CourseProgressDto
{
    public Guid UserId { get; set; }

    public Guid CourseId { get; set; }

    public int TotalLessons { get; set; }

    public int CompletedLessons { get; set; }

    public decimal CompletionPercentage { get; set; }
}