namespace KnowledgeCulture.Application.DTOs;

public class SubmitQuizDto
{
    public Guid QuizId { get; set; }

    public Guid UserId { get; set; }

    public List<SubmitQuizAnswerDto>
        Answers
    { get; set; }
            = new();
}