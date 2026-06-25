using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetCourseByIdQuery(Guid Id)
    : IRequest<CourseDto>;