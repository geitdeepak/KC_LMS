using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetAdminDashboardQueryHandler
    : IRequestHandler<
        GetAdminDashboardQuery,
        AdminDashboardDto>
{
    private readonly IUserRepository
        _userRepository;

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

    public GetAdminDashboardQueryHandler(
        IUserRepository userRepository,
        ICourseRepository courseRepository,
        IModuleRepository moduleRepository,
        ILessonRepository lessonRepository,
        IQuizRepository quizRepository,
        IEnrollmentRepository enrollmentRepository,
        ICertificateRepository certificateRepository)
    {
        _userRepository =
            userRepository;

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

    public async Task<AdminDashboardDto>
        Handle(
            GetAdminDashboardQuery request,
            CancellationToken cancellationToken)
    {
        var users =
            await _userRepository
                .GetAllAsync();

        var courses =
            await _courseRepository
                .GetAllAsync();

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

        return new AdminDashboardDto
        {
            TotalUsers =
                users.Count,

            TotalLearners =
                users.Count(x =>
                    x.Role == "Learner"),

            TotalInstructors =
                users.Count(x =>
                    x.Role == "Instructor"),

            TotalAdmins =
                users.Count(x =>
                    x.Role == "Admin"),

            TotalCourses =
                courses.Count,

            PublishedCourses =
                courses.Count(x =>
                    x.Status == "Published"),

            DraftCourses =
                courses.Count(x =>
                    x.Status == "Draft"),

            TotalModules =
                modules.Count,

            TotalLessons =
                lessons.Count,

            TotalQuizzes =
                quizzes.Count,

            TotalEnrollments =
                enrollments.Count,

            TotalCertificates =
                certificates.Count
        };
    }
}