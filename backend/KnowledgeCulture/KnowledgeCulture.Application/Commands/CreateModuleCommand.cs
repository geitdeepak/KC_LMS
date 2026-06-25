using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Commands;

public record CreateModuleCommand(
    Guid CourseId,
    string Title,
    string Description,
    int Order)
    : IRequest<ModuleDto>;