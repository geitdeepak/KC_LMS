using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetLearnerDashboardQueryHandler
    : IRequestHandler<
        GetLearnerDashboardQuery,
        LearnerDashboardDto>
{
    private readonly IEnrollmentRepository
        _enrollmentRepository;

    private readonly ILessonProgressRepository
        _progressRepository;

    private readonly ILessonRepository
        _lessonRepository;

    private readonly ICertificateRepository
        _certificateRepository;

    public GetLearnerDashboardQueryHandler(
        IEnrollmentRepository enrollmentRepository,
        ILessonProgressRepository progressRepository,
        ILessonRepository lessonRepository,
        ICertificateRepository certificateRepository)
    {
        _enrollmentRepository =
            enrollmentRepository;

        _progressRepository =
            progressRepository;

        _lessonRepository =
            lessonRepository;

        _certificateRepository =
            certificateRepository;
    }

    public async Task<LearnerDashboardDto>
        Handle(
            GetLearnerDashboardQuery request,
            CancellationToken cancellationToken)
    {
        var enrollments =
            await _enrollmentRepository
                .GetEnrollmentCountAsync(
                    request.UserId);

        var completedLessons =
            await _progressRepository
                .GetCompletedCountAsync(
                    request.UserId);

        var certificates =
            await _certificateRepository
                .GetAllAsync();

        var completedCourses =
            certificates.Count(x =>
                x.UserId == request.UserId);

        var totalLessons =
            (await _lessonRepository
                .GetAllAsync())
                .Count;

        decimal progress = 0;

        if (totalLessons > 0)
        {
            progress =
                Math.Min(
                    Math.Round(
                        ((decimal)completedLessons /
                         totalLessons) * 100,
                        2),
                    100);
        }

        return new LearnerDashboardDto
        {
            TotalEnrollments =
                enrollments,

            LessonsCompleted =
                completedLessons,

            CoursesCompleted =
                completedCourses,

            OverallProgress =
                progress
        };
    }
}