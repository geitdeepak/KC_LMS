using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetCoursePlayerQuery(
    Guid CourseId,
    Guid UserId)
    : IRequest<CoursePlayerDto>;