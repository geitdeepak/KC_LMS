using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetQuizStatusQueryHandler
    : IRequestHandler<
        GetQuizStatusQuery,
        QuizStatusDto>
{
    private readonly IQuizRepository
        _quizRepository;

    public GetQuizStatusQueryHandler(
        IQuizRepository quizRepository)
    {
        _quizRepository =
            quizRepository;
    }

    public async Task<QuizStatusDto>
        Handle(
            GetQuizStatusQuery request,
            CancellationToken cancellationToken)
    {
        var passed =
            await _quizRepository
                .HasPassedQuizAsync(
                    request.UserId,
                    request.QuizId);

        return new QuizStatusDto
        {
            QuizId = request.QuizId,
            IsPassed = passed
        };
    }
}