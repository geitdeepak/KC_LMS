namespace KnowledgeCulture.Application.DTOs;

public class SubmitQuizAnswerDto
{
    public Guid QuestionId { get; set; }

    public string SelectedAnswer { get; set; }
        = string.Empty;
}