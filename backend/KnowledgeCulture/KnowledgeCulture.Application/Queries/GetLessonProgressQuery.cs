using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetLessonProgressQuery(
    Guid UserId,
    Guid LessonId)
    : IRequest<LessonProgressDto?>;