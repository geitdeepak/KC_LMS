using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetCourseDetailsQueryHandler
    : IRequestHandler<
        GetCourseDetailsQuery,
        CourseDetailsDto>
{
    private readonly ICourseRepository
        _courseRepository;

    private readonly ILessonProgressRepository
        _progressRepository;

    public GetCourseDetailsQueryHandler(
        ICourseRepository courseRepository,
        ILessonProgressRepository progressRepository)
    {
        _courseRepository =
            courseRepository;

        _progressRepository =
            progressRepository;
    }

    public async Task<CourseDetailsDto>
        Handle(
            GetCourseDetailsQuery request,
            CancellationToken cancellationToken)
    {
        var course =
            await _courseRepository
                .GetCourseWithModulesAsync(
                    request.CourseId);

        if (course == null)
        {
            throw new Exception(
                "Course not found.");
        }

        var progress =
            await _progressRepository
                .GetByUserAsync(
                    request.UserId);

        return new CourseDetailsDto
        {
            Id = course.Id,

            Title = course.Title,

            Description =
                course.Description,

            ThumbnailUrl =
                course.ThumbnailUrl,

            Modules =
                course.Modules
                    .OrderBy(x => x.Order)
                    .Select(module =>
                        new ModuleDetailsDto
                        {
                            Id = module.Id,

                            Title = module.Title,

                            Lessons =
                                module.Lessons
                                    .OrderBy(x => x.Order)
                                    .Select(lesson =>
                                        new LessonDetailsDto
                                        {
                                            Id = lesson.Id,

                                            Title =
                                                lesson.Title,

                                            IsCompleted =
                                                progress.Any(
                                                    p =>
                                                        p.LessonId ==
                                                        lesson.Id &&
                                                        p.IsCompleted)
                                        })
                                    .ToList()
                        })
                    .ToList()
        };
    }
}