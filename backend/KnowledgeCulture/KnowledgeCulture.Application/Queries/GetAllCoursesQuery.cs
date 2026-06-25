using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetAllCoursesQuery()
    : IRequest<List<CourseDto>>;