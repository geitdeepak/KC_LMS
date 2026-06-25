using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetCourseDetailsQuery(
    Guid UserId,
    Guid CourseId)
    : IRequest<CourseDetailsDto>;