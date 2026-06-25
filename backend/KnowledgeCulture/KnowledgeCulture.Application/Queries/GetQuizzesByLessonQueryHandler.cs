using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetQuizzesByLessonQueryHandler
    : IRequestHandler<GetQuizzesByLessonQuery,
        List<QuizDto>>
{
    private readonly IQuizRepository _quizRepository;

    public GetQuizzesByLessonQueryHandler(
        IQuizRepository quizRepository)
    {
        _quizRepository = quizRepository;
    }

    public async Task<List<QuizDto>> Handle(
        GetQuizzesByLessonQuery request,
        CancellationToken cancellationToken)
    {
        var quizzes =
            await _quizRepository
                .GetByLessonIdAsync(
                    request.LessonId);

        return quizzes.Select(x =>
            new QuizDto
            {
                Id = x.Id,
                LessonId = x.LessonId,
                Title = x.Title,
                PassingScore = x.PassingScore,
                IsPublished = x.IsPublished
            }).ToList();
    }
}