namespace KnowledgeCulture.Domain.Entities;

public class QuizAttempt
{
    public Guid Id { get; set; }

    public Guid QuizId { get; set; }

    public Guid UserId { get; set; }

    public int Score { get; set; }

    public int TotalMarks { get; set; }

    public bool IsPassed { get; set; }

    public DateTime AttemptedAt { get; set; }
        = DateTime.UtcNow;

    public Quiz? Quiz { get; set; }

    public User? User { get; set; }

    public ICollection<QuizAnswer> Answers { get; set; }
        = new List<QuizAnswer>();
}