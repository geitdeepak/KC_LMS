namespace KnowledgeCulture.Application.DTOs;

public class QuizDto
{
    public Guid Id { get; set; }

    public Guid LessonId { get; set; }

    public string Title { get; set; } = string.Empty;

    public int PassingScore { get; set; }

    public bool IsPublished { get; set; }
}