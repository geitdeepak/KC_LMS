using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Commands;

public record MarkLessonCompleteCommand(
    Guid UserId,
    Guid LessonId)
    : IRequest<MarkLessonCompleteDto>;