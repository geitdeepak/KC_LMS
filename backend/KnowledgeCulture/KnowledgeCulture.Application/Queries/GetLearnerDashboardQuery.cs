using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetLearnerDashboardQuery(
    Guid UserId)
    : IRequest<LearnerDashboardDto>;