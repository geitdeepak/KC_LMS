using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetUserProgressQuery(
    Guid UserId)
    : IRequest<List<LessonProgressDto>>;