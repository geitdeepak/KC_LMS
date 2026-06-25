namespace KnowledgeCulture.Domain.Entities;

public class Lesson
{
    public Guid Id { get; set; }

    public Guid ModuleId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    // Video | PDF | Quiz | Assignment
    public string LessonType { get; set; } = string.Empty;

    public string NotesUrl { get; set; } = string.Empty;


    public string VideoUrl { get; set; } = string.Empty;


    public string ProjectUrl { get; set; } = string.Empty;

    public int Order { get; set; }

    public bool IsPublished { get; set; }

    public DateTime CreatedAt { get; set; }
        = DateTime.UtcNow;

    // Navigation Properties

    public Module Module { get; set; } = null!;

    public ICollection<Quiz> Quizzes { get; set; }
        = new List<Quiz>();

    public ICollection<LessonProgress> LessonProgresses { get; set; }
        = new List<LessonProgress>();
}