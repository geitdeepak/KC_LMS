using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetEnrollmentsByUserQuery(
    Guid UserId)
    : IRequest<List<EnrollmentDto>>;