namespace KnowledgeCulture.Application.DTOs;

public class ContinueLearningDto
{
    public Guid CourseId { get; set; }

    public string CourseTitle { get; set; } = string.Empty;

    public string ThumbnailUrl { get; set; } = string.Empty;

    public Guid ModuleId { get; set; }

    public string ModuleTitle { get; set; } = string.Empty;

    public Guid LessonId { get; set; }

    public string LessonTitle { get; set; } = string.Empty;

    public string LessonType { get; set; } = string.Empty;

    public decimal Progress { get; set; }

    public int CompletedLessons { get; set; }

    public int TotalLessons { get; set; }

    public bool IsCourseCompleted { get; set; }
}