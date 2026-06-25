namespace KnowledgeCulture.Domain.Entities;

public class QuizAnswer
{
    public Guid Id { get; set; }

    public Guid QuizAttemptId { get; set; }

    public Guid QuestionId { get; set; }

    public string SelectedAnswer { get; set; }
        = string.Empty;

    public bool IsCorrect { get; set; }

    public QuizAttempt? QuizAttempt { get; set; }

    public QuizQuestion? Question { get; set; }
}