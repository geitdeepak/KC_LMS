using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetQuizzesByLessonQuery(Guid LessonId)
    : IRequest<List<QuizDto>>;