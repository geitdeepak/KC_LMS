namespace KnowledgeCulture.Application.DTOs;

public class LessonProgressDto
{
    public Guid UserId { get; set; }

    public Guid LessonId { get; set; }

    public bool IsCompleted { get; set; }

    public DateTime? CompletedAt { get; set; }
}