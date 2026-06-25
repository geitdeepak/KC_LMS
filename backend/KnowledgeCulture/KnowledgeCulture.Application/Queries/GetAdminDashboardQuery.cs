using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetAdminDashboardQuery()
    : IRequest<AdminDashboardDto>;