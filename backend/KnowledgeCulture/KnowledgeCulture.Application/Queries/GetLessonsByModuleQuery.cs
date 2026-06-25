using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetLessonsByModuleQuery(Guid ModuleId)
    : IRequest<List<LessonDto>>;