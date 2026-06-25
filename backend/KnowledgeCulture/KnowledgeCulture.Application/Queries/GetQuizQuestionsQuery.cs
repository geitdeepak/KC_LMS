using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetQuizQuestionsQuery(
    Guid QuizId)
    : IRequest<List<QuizQuestionDto>>;