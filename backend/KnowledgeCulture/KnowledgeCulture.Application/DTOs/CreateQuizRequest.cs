namespace KnowledgeCulture.Application.DTOs;

public class CreateQuizRequest
{
    public Guid LessonId { get; set; }

    public string Title { get; set; } = string.Empty;

    public int PassingScore { get; set; }
}