using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Commands;

public record CreateCourseCommand(
    string Title,
    string Description,
    string Category,
    string Level,
    string ThumbnailUrl,
    Guid CreatedBy)
    : IRequest<CourseDto>;