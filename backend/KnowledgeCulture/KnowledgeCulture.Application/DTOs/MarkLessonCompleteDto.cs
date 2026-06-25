namespace KnowledgeCulture.Application.DTOs;

public class MarkLessonCompleteDto
{
    public Guid LessonId { get; set; }

    public bool IsCompleted { get; set; }

    public DateTime? CompletedAt { get; set; }
}