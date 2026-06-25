namespace KnowledgeCulture.Application.DTOs;

public class QuizStatusDto
{
    public Guid QuizId { get; set; }

    public bool IsPassed { get; set; }
}