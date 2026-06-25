namespace KnowledgeCulture.API.Requests;

public class SubmitQuizRequest
{
    public Guid QuizId { get; set; }

    public List<SubmitQuizAnswerRequest>
        Answers
    { get; set; }
        = new();
}