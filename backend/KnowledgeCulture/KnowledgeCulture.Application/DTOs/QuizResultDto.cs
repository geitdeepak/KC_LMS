namespace KnowledgeCulture.Application.DTOs;

public class QuizResultDto
{
    public int Score { get; set; }

    public int TotalMarks { get; set; }

    public bool IsPassed { get; set; }
}