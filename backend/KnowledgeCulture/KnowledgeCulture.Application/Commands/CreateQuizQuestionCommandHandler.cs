using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Commands;

public class CreateQuizQuestionCommandHandler
    : IRequestHandler<CreateQuizQuestionCommand,
        QuizQuestionDto>
{
    private readonly IQuizRepository _quizRepository;

    public CreateQuizQuestionCommandHandler(
        IQuizRepository quizRepository)
    {
        _quizRepository = quizRepository;
    }

    public async Task<QuizQuestionDto> Handle(
        CreateQuizQuestionCommand request,
        CancellationToken cancellationToken)
    {
        var question = new QuizQuestion
        {
            Id = Guid.NewGuid(),
            QuizId = request.QuizId,
            Question = request.Question,
            OptionA = request.OptionA,
            OptionB = request.OptionB,
            OptionC = request.OptionC,
            OptionD = request.OptionD,
            CorrectAnswer = request.CorrectAnswer,
            Marks = request.Marks
        };

        await _quizRepository
            .AddQuestionAsync(question);

        await _quizRepository
            .SaveChangesAsync();

        return new QuizQuestionDto
        {
            Id = question.Id,
            QuizId = question.QuizId,
            Question = question.Question,
            OptionA = question.OptionA,
            OptionB = question.OptionB,
            OptionC = question.OptionC,
            OptionD = question.OptionD,
            Marks = question.Marks
        };
    }
}