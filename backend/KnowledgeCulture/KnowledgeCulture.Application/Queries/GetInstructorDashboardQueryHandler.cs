using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetInstructorDashboardQueryHandler
    : IRequestHandler<
        GetInstructorDashboardQuery,
        InstructorDashboardDto>
{
    private readonly ICourseRepository
    _courseRepository;

    private readonly IModuleRepository
        _moduleRepository;

    private readonly ILessonRepository
        _lessonRepository;

    private readonly IQuizRepository
        _quizRepository;

    private readonly IEnrollmentRepository
    _enrollmentRepository;

    private readonly ICertificateRepository
        _certificateRepository;

    public GetInstructorDashboardQueryHandler(
        ICourseRepository courseRepository,
        IModuleRepository moduleRepository,
        ILessonRepository lessonRepository,
        IQuizRepository quizRepository, 
        IEnrollmentRepository enrollmentRepository,
        ICertificateRepository certificateRepository)
    {
        _courseRepository =
            courseRepository;

        _moduleRepository =
            moduleRepository;

        _lessonRepository =
            lessonRepository;

        _quizRepository =
            quizRepository;

        _enrollmentRepository =
            enrollmentRepository;

        _certificateRepository =
            certificateRepository;
    }

    public async Task<InstructorDashboardDto>
        Handle(
            GetInstructorDashboardQuery request,
            CancellationToken cancellationToken)
    {
        var courses =
            await _courseRepository
                .GetByCreatedByAsync(
                    request.InstructorId);

        var modules =
             await _moduleRepository
                .GetAllAsync();

        var lessons =
            await _lessonRepository
                .GetAllAsync();

        var quizzes =
            await _quizRepository
                .GetAllAsync();
        var enrollments =
            await _enrollmentRepository
            .GetAllAsync();

        var certificates =
            await _certificateRepository
                .GetAllAsync();

        var courseIds =
            courses.Select(x => x.Id)
                .ToList();

        var totalModules =
            modules.Count(x =>
                courseIds.Contains(
                    x.CourseId));

        var moduleIds =
            modules
                .Where(x =>
                    courseIds.Contains(
                        x.CourseId))
                .Select(x => x.Id)
                .ToList();

        var totalLessons =
            lessons.Count(x =>
                moduleIds.Contains(
                    x.ModuleId));

        var lessonIds =
            lessons
                .Where(x =>
                    moduleIds.Contains(
                        x.ModuleId))
                .Select(x => x.Id)
                .ToList();

        var totalQuizzes =
            quizzes.Count(x =>
                lessonIds.Contains(
                    x.LessonId));

        var totalEnrollments =
            enrollments.Count(x =>
                courseIds.Contains(
                    x.CourseId));

        var totalCertificates =
            certificates.Count(x =>
                courseIds.Contains(
                    x.CourseId));

        return new InstructorDashboardDto
        {
            TotalCourses =
                courses.Count,

            PublishedCourses =
                courses.Count(x =>
                    x.Status == "Published"),

            DraftCourses =
                courses.Count(x =>
                    x.Status == "Draft"),

            TotalModules =
                totalModules,

            TotalLessons =
                totalLessons,

            TotalQuizzes =
                totalQuizzes,

            TotalEnrollments =
                totalEnrollments,

            TotalCertificates =
                totalCertificates
        };
    }
}