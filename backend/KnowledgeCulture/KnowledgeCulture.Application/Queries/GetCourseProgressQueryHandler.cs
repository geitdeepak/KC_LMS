using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetCourseProgressQueryHandler
    : IRequestHandler<GetCourseProgressQuery,
        CourseProgressDto>
{
    private readonly ILessonRepository _lessonRepository;
    private readonly ILessonProgressRepository _progressRepository;
    private readonly IModuleRepository _moduleRepository;

    public GetCourseProgressQueryHandler(
        ILessonRepository lessonRepository,
        ILessonProgressRepository progressRepository,
        IModuleRepository moduleRepository)
    {
        _lessonRepository = lessonRepository;
        _progressRepository = progressRepository;
        _moduleRepository = moduleRepository;
    }

    public async Task<CourseProgressDto> Handle(
        GetCourseProgressQuery request,
        CancellationToken cancellationToken)
    {
        var modules =
            await _moduleRepository
                .GetByCourseIdAsync(
                    request.CourseId);

        var moduleIds =
            modules.Select(x => x.Id).ToList();

        var lessons =
            await _lessonRepository.GetAllAsync();

        var courseLessons =
            lessons.Where(x =>
                moduleIds.Contains(x.ModuleId))
                .ToList();

        var progress =
            await _progressRepository
                .GetByUserAsync(
                    request.UserId);

        var completedLessons =
            progress.Count(x =>
                x.IsCompleted &&
                courseLessons.Any(
                    l => l.Id == x.LessonId));

        var totalLessons =
            courseLessons.Count;

        decimal percentage = 0;

        if (totalLessons > 0)
        {
            percentage =
                Math.Round(
                    ((decimal)completedLessons /
                     totalLessons) * 100,
                    2);
        }

        return new CourseProgressDto
        {
            UserId = request.UserId,
            CourseId = request.CourseId,
            TotalLessons = totalLessons,
            CompletedLessons = completedLessons,
            CompletionPercentage = percentage
        };
    }
}