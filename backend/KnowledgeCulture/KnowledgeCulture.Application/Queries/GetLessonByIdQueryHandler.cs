using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetLessonByIdQueryHandler
    : IRequestHandler<GetLessonByIdQuery, LessonDto>
{
    private readonly ILessonRepository
        _lessonRepository;

    public GetLessonByIdQueryHandler(
        ILessonRepository lessonRepository)
    {
        _lessonRepository =
            lessonRepository;
    }

    public async Task<LessonDto> Handle(
        GetLessonByIdQuery request,
        CancellationToken cancellationToken)
    {
        var lesson =
            await _lessonRepository
                .GetByIdAsync(
                    request.LessonId);

        if (lesson == null)
        {
            throw new Exception(
                "Lesson not found.");
        }

        return new LessonDto
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
    }
}