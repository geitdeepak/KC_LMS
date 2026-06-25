using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Commands;

public class EnrollCourseCommandHandler
    : IRequestHandler<EnrollCourseCommand,
        EnrollmentDto>
{
    private readonly IEnrollmentRepository
        _enrollmentRepository;

    public EnrollCourseCommandHandler(
        IEnrollmentRepository enrollmentRepository)
    {
        _enrollmentRepository =
            enrollmentRepository;
    }

    public async Task<EnrollmentDto> Handle(
        EnrollCourseCommand request,
        CancellationToken cancellationToken)
    {
        var existing =
            await _enrollmentRepository
                .GetByUserAndCourseAsync(
                    request.UserId,
                    request.CourseId);

        if (existing != null)
            throw new Exception(
                "User already enrolled.");

        var enrollment = new Enrollment
        {
            Id = Guid.NewGuid(),
            UserId = request.UserId,
            CourseId = request.CourseId
        };

        await _enrollmentRepository
            .AddAsync(enrollment);

        await _enrollmentRepository
            .SaveChangesAsync();

        return new EnrollmentDto
        {
            Id = enrollment.Id,
            UserId = enrollment.UserId,
            CourseId = enrollment.CourseId,
            EnrolledAt = enrollment.EnrolledAt
        };
    }
}