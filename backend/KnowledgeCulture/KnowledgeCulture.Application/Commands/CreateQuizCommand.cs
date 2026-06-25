using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Commands;

public record CreateQuizCommand(
    Guid LessonId,
    string Title,
    int PassingScore)
    : IRequest<QuizDto>;