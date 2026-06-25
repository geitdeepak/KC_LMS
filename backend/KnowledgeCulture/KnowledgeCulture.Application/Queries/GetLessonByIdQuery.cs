using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetLessonByIdQuery(
    Guid LessonId)
    : IRequest<LessonDto>;