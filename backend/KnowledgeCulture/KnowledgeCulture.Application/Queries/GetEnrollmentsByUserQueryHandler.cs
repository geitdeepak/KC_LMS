using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetEnrollmentsByUserQueryHandler
    : IRequestHandler<GetEnrollmentsByUserQuery,
        List<EnrollmentDto>>
{
    private readonly IEnrollmentRepository
        _enrollmentRepository;

    public GetEnrollmentsByUserQueryHandler(
        IEnrollmentRepository enrollmentRepository)
    {
        _enrollmentRepository =
            enrollmentRepository;
    }

    public async Task<List<EnrollmentDto>> Handle(
        GetEnrollmentsByUserQuery request,
        CancellationToken cancellationToken)
    {
        var enrollments =
            await _enrollmentRepository
                .GetByUserIdAsync(
                    request.UserId);

        return enrollments.Select(x =>
            new EnrollmentDto
            {
                Id = x.Id,
                UserId = x.UserId,
                CourseId = x.CourseId,
                EnrolledAt = x.EnrolledAt
            }).ToList();
    }
}