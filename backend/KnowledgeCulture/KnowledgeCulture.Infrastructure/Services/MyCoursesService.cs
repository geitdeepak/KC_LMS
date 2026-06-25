using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Infrastructure.Services;

public class MyCoursesService : IMyCoursesService
{
    private readonly IEnrollmentRepository _enrollmentRepository;

    private readonly ICourseRepository _courseRepository;

    private readonly ILessonProgressRepository _lessonProgressRepository;

    private readonly ICertificateRepository _certificateRepository;

    public MyCoursesService(
        IEnrollmentRepository enrollmentRepository,
        ICourseRepository courseRepository,
        ILessonProgressRepository lessonProgressRepository,
        ICertificateRepository certificateRepository)
    {
        _enrollmentRepository = enrollmentRepository;
        _courseRepository = courseRepository;
        _lessonProgressRepository = lessonProgressRepository;
        _certificateRepository = certificateRepository;
    }

    public async Task<List<MyCourseDto>> GetAsync(
        Guid userId)
    {
        var result = new List<MyCourseDto>();

        var enrollments =
            await _enrollmentRepository
                .GetByUserIdAsync(userId);

        foreach (var enrollment in enrollments)
        {
            var course =
                await _courseRepository
                    .GetCourseWithModulesAsync(
                        enrollment.CourseId);

            if (course == null)
            {
                continue;
            }

            var orderedLessons =
                course.Modules
                    .OrderBy(m => m.Order)
                    .SelectMany(m =>
                        m.Lessons.OrderBy(l => l.Order))
                    .ToList();

            var completedLessons =
                await _lessonProgressRepository
                    .GetCompletedLessonsAsync(userId);

            var completedLessonIds =
                completedLessons
                    .Select(x => x.LessonId)
                    .ToHashSet();

            var lastCompletedLesson =
                orderedLessons
                    .LastOrDefault(x =>
                        completedLessonIds.Contains(x.Id));

            var certificate =
                await _certificateRepository
                    .GetByUserAndCourseAsync(
                        userId,
                        course.Id);

            decimal progress = 0;

            if (orderedLessons.Count > 0)
            {
                progress = Math.Round(
                    (decimal)completedLessonIds.Count /
                    orderedLessons.Count * 100,
                    2);
            }

            result.Add(
                new MyCourseDto
                {
                    Id = course.Id,

                    Title = course.Title,

                    Description = course.Description,

                    Category = course.Category,

                    Level = course.Level,

                    ThumbnailUrl = course.ThumbnailUrl,

                    Progress = progress,

                    CompletedLessons =
                        completedLessonIds.Count,

                    TotalLessons =
                        orderedLessons.Count,

                    IsCompleted =
                        completedLessonIds.Count ==
                        orderedLessons.Count,

                    CertificateEarned =
                        certificate != null,

                    LastLessonTitle =
                        lastCompletedLesson?.Title
                        ?? string.Empty,

                    EnrolledAt =
                        enrollment.EnrolledAt
                });
        }

        return result
            .OrderByDescending(x => x.EnrolledAt)
            .ToList();
    }
}