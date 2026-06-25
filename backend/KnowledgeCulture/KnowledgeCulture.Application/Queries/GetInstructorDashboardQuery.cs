using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetInstructorDashboardQuery(
    Guid InstructorId)
    : IRequest<InstructorDashboardDto>;