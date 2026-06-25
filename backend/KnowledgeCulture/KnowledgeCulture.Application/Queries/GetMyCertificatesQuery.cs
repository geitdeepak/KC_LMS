using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Queries;

public record GetMyCertificatesQuery(
    Guid UserId)
    : IRequest<List<CertificateDto>>;