using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetLessonsByModuleQueryHandler
    : IRequestHandler<GetLessonsByModuleQuery,
        List<LessonDto>>
{
    private readonly ILessonRepository _lessonRepository;

    public GetLessonsByModuleQueryHandler(
        ILessonRepository lessonRepository)
    {
        _lessonRepository = lessonRepository;
    }

    public async Task<List<LessonDto>> Handle(
        GetLessonsByModuleQuery request,
        CancellationToken cancellationToken)
    {
        var lessons =
            await _lessonRepository
                .GetByModuleIdAsync(
                    request.ModuleId);

        return lessons
            .Select(x => new LessonDto
            {
                Id = x.Id,

                ModuleId = x.ModuleId,

                Title = x.Title,

                Description = x.Description,

                LessonType = x.LessonType,

                NotesUrl = x.NotesUrl,

                VideoUrl = x.VideoUrl,

                ProjectUrl = x.ProjectUrl,

                Order = x.Order,

                IsPublished = x.IsPublished
            })
            .ToList();
    }
}