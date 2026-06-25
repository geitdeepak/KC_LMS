using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetQuizQuestionsQueryHandler
    : IRequestHandler<
        GetQuizQuestionsQuery,
        List<QuizQuestionDto>>
{
    private readonly IQuizRepository _quizRepository;

    public GetQuizQuestionsQueryHandler(
        IQuizRepository quizRepository)
    {
        _quizRepository = quizRepository;
    }

    public async Task<List<QuizQuestionDto>>
        Handle(
            GetQuizQuestionsQuery request,
            CancellationToken cancellationToken)
    {
        var questions =
            await _quizRepository
                .GetQuestionsByQuizIdAsync(
                    request.QuizId);

        return questions
            .Select(x => new QuizQuestionDto
            {
                Id = x.Id,
                QuizId = x.QuizId,
                Question = x.Question,
                OptionA = x.OptionA,
                OptionB = x.OptionB,
                OptionC = x.OptionC,
                OptionD = x.OptionD,
                Marks = x.Marks
            })
            .ToList();
    }
}