using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetUserProgressQueryHandler
    : IRequestHandler<GetUserProgressQuery,
        List<LessonProgressDto>>
{
    private readonly ILessonProgressRepository
        _repository;

    public GetUserProgressQueryHandler(
        ILessonProgressRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<LessonProgressDto>>
        Handle(
            GetUserProgressQuery request,
            CancellationToken cancellationToken)
    {
        var progress =
            await _repository.GetByUserAsync(
                request.UserId);

        return progress.Select(x =>
            new LessonProgressDto
            {
                UserId = x.UserId,
                LessonId = x.LessonId,
                IsCompleted = x.IsCompleted,
                CompletedAt = x.CompletedAt
            }).ToList();
    }
}