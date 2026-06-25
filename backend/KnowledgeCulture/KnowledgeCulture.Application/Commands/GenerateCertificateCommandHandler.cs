using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Commands;

public class GenerateCertificateCommandHandler
    : IRequestHandler<
        GenerateCertificateCommand,
        CertificateDto>
{
    private readonly ICertificateRepository
        _certificateRepository;

    public GenerateCertificateCommandHandler(
        ICertificateRepository certificateRepository)
    {
        _certificateRepository =
            certificateRepository;
    }

    public async Task<CertificateDto> Handle(
        GenerateCertificateCommand request,
        CancellationToken cancellationToken)
    {
        var existingCertificate =
            await _certificateRepository
                .GetByUserAndCourseAsync(
                    request.UserId,
                    request.CourseId);

        if (existingCertificate != null)
        {
            return new CertificateDto
            {
                Id = existingCertificate.Id,
                UserId =
                    existingCertificate.UserId,
                CourseId =
                    existingCertificate.CourseId,
                CertificateNumber =
                    existingCertificate
                        .CertificateNumber,
                IssuedAt =
                    existingCertificate.IssuedAt
            };
        }

        var certificate =
            new Certificate
            {
                Id = Guid.NewGuid(),

                UserId = request.UserId,

                CourseId = request.CourseId,

                CertificateNumber =
                    $"KC-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString()[..8].ToUpper()}"
            };

        await _certificateRepository
            .AddAsync(certificate);

        await _certificateRepository
            .SaveChangesAsync();

        return new CertificateDto
        {
            Id = certificate.Id,
            UserId = certificate.UserId,
            CourseId = certificate.CourseId,
            CertificateNumber =
                certificate.CertificateNumber,
            IssuedAt =
                certificate.IssuedAt
        };
    }
}