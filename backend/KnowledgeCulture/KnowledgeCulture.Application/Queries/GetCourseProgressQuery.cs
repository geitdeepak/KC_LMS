using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetCourseProgressQuery(
    Guid UserId,
    Guid CourseId)
    : IRequest<CourseProgressDto>;