using MediatR;

namespace KnowledgeCulture.Application.Commands;

public record DeleteCourseCommand(
    Guid Id,
    Guid UserId)
    : IRequest<Unit>;