namespace KnowledgeCulture.API.Requests;

public class CreateQuizQuestionRequest
{
    public Guid QuizId { get; set; }

    public string Question { get; set; }
        = string.Empty;

    public string OptionA { get; set; }
        = string.Empty;

    public string OptionB { get; set; }
        = string.Empty;

    public string OptionC { get; set; }
        = string.Empty;

    public string OptionD { get; set; }
        = string.Empty;

    public string CorrectAnswer { get; set; }
        = string.Empty;

    public int Marks { get; set; }
}