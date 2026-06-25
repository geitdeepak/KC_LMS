using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Commands;

public record CreateLessonCommand(
    Guid ModuleId,
    string Title,
    string Description,
    string LessonType,
    string NotesUrl,
    string VideoUrl,
    string ProjectUrl,
    int Order)
    : IRequest<LessonDto>;