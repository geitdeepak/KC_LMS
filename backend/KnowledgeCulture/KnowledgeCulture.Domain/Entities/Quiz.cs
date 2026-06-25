namespace KnowledgeCulture.Domain.Entities;

public class Quiz
{
    public Guid Id { get; set; }

    public Guid LessonId { get; set; }

    public string Title { get; set; } = string.Empty;

    public int PassingScore { get; set; }

    public bool IsPublished { get; set; }

    public DateTime CreatedAt { get; set; }
        = DateTime.UtcNow;

    public Lesson? Lesson { get; set; }

    public ICollection<QuizQuestion> Questions { get; set; }
        = new List<QuizQuestion>();
}