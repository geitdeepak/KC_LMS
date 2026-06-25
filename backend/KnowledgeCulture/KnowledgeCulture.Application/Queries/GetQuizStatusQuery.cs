using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetQuizStatusQuery(
    Guid UserId,
    Guid QuizId)
    : IRequest<QuizStatusDto>;