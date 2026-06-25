using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Commands;

public record GenerateCertificateCommand(
    Guid UserId,
    Guid CourseId)
    : IRequest<CertificateDto>;