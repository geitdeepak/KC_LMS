namespace KnowledgeCulture.API.Requests;

public class SubmitQuizAnswerRequest
{
    public Guid QuestionId { get; set; }

    public string SelectedAnswer { get; set; }
        = string.Empty;
}