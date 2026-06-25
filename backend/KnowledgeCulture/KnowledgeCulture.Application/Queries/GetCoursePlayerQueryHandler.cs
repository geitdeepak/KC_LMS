using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetCoursePlayerQueryHandler
    : IRequestHandler<
        GetCoursePlayerQuery,
        CoursePlayerDto>
{
    private readonly ICourseRepository _courseRepository;

    private readonly ILessonRepository _lessonRepository;

    private readonly IQuizRepository _quizRepository;

    private readonly ILessonProgressRepository _lessonProgressRepository;

    public GetCoursePlayerQueryHandler(
        ICourseRepository courseRepository,
        ILessonRepository lessonRepository,
        IQuizRepository quizRepository,
        ILessonProgressRepository lessonProgressRepository)
    {
        _courseRepository = courseRepository;
        _lessonRepository = lessonRepository;
        _quizRepository = quizRepository;
        _lessonProgressRepository =
            lessonProgressRepository;
    }

    public async Task<CoursePlayerDto> Handle(
        GetCoursePlayerQuery request,
        CancellationToken cancellationToken)
    {
        var course =
            await _courseRepository
                .GetByIdAsync(request.CourseId);

        if (course == null)
        {
            throw new Exception(
                "Course not found.");
        }

        var lessons =
            course.Modules
                .SelectMany(x => x.Lessons)
                .OrderBy(x => x.Order)
                .ToList();

        LessonDto? currentLesson = null;

        QuizDto? currentQuiz = null;

        foreach (var lesson in lessons)
        {
            var progress =
                await _lessonProgressRepository
                    .GetByUserAndLessonAsync(
                        request.UserId,
                        lesson.Id);

            if (progress == null ||
                !progress.IsCompleted)
            {
                currentLesson =
                    new LessonDto
                    {
                        Id = lesson.Id,

                        ModuleId = lesson.ModuleId,

                        Title = lesson.Title,

                        Description = lesson.Description,

                        LessonType = lesson.LessonType,

                        NotesUrl = lesson.NotesUrl,

                        VideoUrl = lesson.VideoUrl,

                        ProjectUrl = lesson.ProjectUrl,

                        Order = lesson.Order,

                        IsPublished = lesson.IsPublished
                    };

                var quizzes =
                    await _quizRepository
                        .GetByLessonIdAsync(
                            lesson.Id);

                if (quizzes.Any())
                {
                    currentQuiz =
                        new QuizDto
                        {
                            Id = quizzes.First().Id,

                            LessonId = lesson.Id,

                            Title = quizzes.First().Title,

                            PassingScore = quizzes.First().PassingScore,

                            IsPublished = quizzes.First().IsPublished
                        };
                }

                break;
            }
        }

        var totalLessons = lessons.Count;

        int completedLessons = 0;

        foreach (var lesson in lessons)
        {
            var progress =
                await _lessonProgressRepository
                    .GetByUserAndLessonAsync(
                        request.UserId,
                        lesson.Id);

            if (progress != null &&
                progress.IsCompleted)
            {
                completedLessons++;
            }
        }

        decimal progressPercent = 0;

        if (totalLessons > 0)
        {
            progressPercent =
                Math.Round(
                    ((decimal)completedLessons /
                    totalLessons) * 100,
                    2);
        }

        return new CoursePlayerDto
        {
            CurrentLesson = currentLesson,

            CurrentQuiz = currentQuiz,

            Progress = progressPercent
        };
    }
}