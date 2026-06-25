using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Commands;

public record UpdateCourseCommand(
    Guid Id,
    string Title,
    string Description,
    string Category,
    string Level,
    string ThumbnailUrl,
    Guid UserId)
    : IRequest<CourseDto>;