using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Commands;

public class CreateQuizCommandHandler
    : IRequestHandler<CreateQuizCommand, QuizDto>
{
    private readonly IQuizRepository _quizRepository;

    public CreateQuizCommandHandler(
        IQuizRepository quizRepository)
    {
        _quizRepository = quizRepository;
    }

    public async Task<QuizDto> Handle(
        CreateQuizCommand request,
        CancellationToken cancellationToken)
    {
        var quiz = new Quiz
        {
            Id = Guid.NewGuid(),
            LessonId = request.LessonId,
            Title = request.Title,
            PassingScore = request.PassingScore,
            IsPublished = false
        };

        await _quizRepository.AddAsync(quiz);

        await _quizRepository.SaveChangesAsync();

        return new QuizDto
        {
            Id = quiz.Id,
            LessonId = quiz.LessonId,
            Title = quiz.Title,
            PassingScore = quiz.PassingScore,
            IsPublished = quiz.IsPublished
        };
    }
}