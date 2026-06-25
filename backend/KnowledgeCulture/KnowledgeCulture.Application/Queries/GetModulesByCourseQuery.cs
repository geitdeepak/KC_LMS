using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetModulesByCourseQuery(
    Guid CourseId)
    : IRequest<List<ModuleDto>>;