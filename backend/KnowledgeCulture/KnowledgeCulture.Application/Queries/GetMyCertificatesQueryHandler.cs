using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetMyCertificatesQueryHandler
    : IRequestHandler<
        GetMyCertificatesQuery,
        List<CertificateDto>>
{
    private readonly ICertificateRepository
        _certificateRepository;

    private readonly ICourseRepository
        _courseRepository;

    public GetMyCertificatesQueryHandler(
        ICertificateRepository certificateRepository,
        ICourseRepository courseRepository)
    {
        _certificateRepository =
            certificateRepository;

        _courseRepository =
            courseRepository;
    }

    public async Task<List<CertificateDto>>
        Handle(
            GetMyCertificatesQuery request,
            CancellationToken cancellationToken)
    {
        var certificates =
            await _certificateRepository
                .GetAllAsync();

        var userCertificates =
            certificates
                .Where(x =>
                    x.UserId ==
                    request.UserId)
                .ToList();

        var result =
            new List<CertificateDto>();

        foreach (var certificate
                 in userCertificates)
        {
            var course =
                await _courseRepository
                    .GetByIdAsync(
                        certificate.CourseId);

            result.Add(
                new CertificateDto
                {
                    Id =
                        certificate.Id,

                    CourseTitle =
                        course?.Title ??
                        "Unknown Course",

                    CertificateNumber =
                        certificate.CertificateNumber,

                    IssuedAt =
                        certificate.IssuedAt
                });
        }

        return result;
    }
}