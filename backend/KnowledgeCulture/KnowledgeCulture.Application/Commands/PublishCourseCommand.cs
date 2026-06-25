using MediatR;

namespace KnowledgeCulture.Application.Commands;

public record PublishCourseCommand(
    Guid Id,
    Guid UserId)
    : IRequest<Unit>;