using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Infrastructure.Services;

public class ContinueLearningService
    : IContinueLearningService
{
    private readonly IEnrollmentRepository _enrollmentRepository;

    private readonly ICourseRepository _courseRepository;

    private readonly ILessonProgressRepository _lessonProgressRepository;

    public ContinueLearningService(
        IEnrollmentRepository enrollmentRepository,
        ICourseRepository courseRepository,
        ILessonProgressRepository lessonProgressRepository)
    {
        _enrollmentRepository = enrollmentRepository;
        _courseRepository = courseRepository;
        _lessonProgressRepository = lessonProgressRepository;
    }

    public async Task<ContinueLearningDto?> GetAsync(
        Guid userId)
    {
        var enrollment =
            (await _enrollmentRepository
                .GetByUserIdAsync(userId))
            .OrderByDescending(x => x.EnrolledAt)
            .FirstOrDefault();

        if (enrollment == null)
        {
            return null;
        }

        var course =
            await _courseRepository
                .GetCourseWithModulesAsync(
                    enrollment.CourseId);

        if (course == null)
        {
            return null;
        }

        var orderedLessons =
            course.Modules
                .OrderBy(m => m.Order)
                .SelectMany(m =>
                    m.Lessons.OrderBy(l => l.Order))
                .ToList();

        if (!orderedLessons.Any())
        {
            return null;
        }

        var completedLessons =
            await _lessonProgressRepository
                .GetCompletedLessonsAsync(userId);

        var completedLessonIds =
            completedLessons
                .Select(x => x.LessonId)
                .ToHashSet();

        var nextLesson =
            orderedLessons.FirstOrDefault(x =>
                !completedLessonIds.Contains(x.Id));

        bool isCourseCompleted = false;

        if (nextLesson == null)
        {
            isCourseCompleted = true;

            nextLesson =
                orderedLessons.Last();
        }

        var module =
            course.Modules.First(x =>
                x.Id == nextLesson.ModuleId);

        decimal progress =
            orderedLessons.Count == 0
                ? 0
                : Math.Round(
                    (decimal)completedLessonIds.Count /
                    orderedLessons.Count * 100,
                    2);

        return new ContinueLearningDto
        {
            CourseId = course.Id,

            CourseTitle = course.Title,

            ThumbnailUrl = course.ThumbnailUrl,

            ModuleId = module.Id,

            ModuleTitle = module.Title,

            LessonId = nextLesson.Id,

            LessonTitle = nextLesson.Title,

            LessonType = nextLesson.LessonType,

            Progress = progress,

            CompletedLessons = completedLessonIds.Count,

            TotalLessons = orderedLessons.Count,

            IsCourseCompleted = isCourseCompleted
        };
    }
}