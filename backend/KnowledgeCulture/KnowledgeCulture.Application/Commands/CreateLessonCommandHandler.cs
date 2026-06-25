using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Commands;

public class CreateLessonCommandHandler
    : IRequestHandler<CreateLessonCommand, LessonDto>
{
    private readonly ILessonRepository _lessonRepository;

    public CreateLessonCommandHandler(
        ILessonRepository lessonRepository)
    {
        _lessonRepository = lessonRepository;
    }

    public async Task<LessonDto> Handle(
        CreateLessonCommand request,
        CancellationToken cancellationToken)
    {
        var lesson = new Lesson
        {
            Id = Guid.NewGuid(),

            ModuleId = request.ModuleId,

            Title = request.Title,

            Description = request.Description,

            LessonType = request.LessonType,

            NotesUrl = request.NotesUrl,

            VideoUrl = request.VideoUrl,

            ProjectUrl = request.ProjectUrl,

            Order = request.Order,

            IsPublished = false
        };

        await _lessonRepository.AddAsync(lesson);

        await _lessonRepository.SaveChangesAsync();

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