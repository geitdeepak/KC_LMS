namespace KnowledgeCulture.Application.DTOs;

public class CompleteLessonRequest
{
    public Guid UserId { get; set; }

    public Guid LessonId { get; set; }
}