using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Commands;

public record CreateQuizQuestionCommand(
    Guid QuizId,
    string Question,
    string OptionA,
    string OptionB,
    string OptionC,
    string OptionD,
    string CorrectAnswer,
    int Marks)
    : IRequest<QuizQuestionDto>;