using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetLessonProgressQueryHandler
    : IRequestHandler<
        GetLessonProgressQuery,
        LessonProgressDto?>
{
    private readonly ILessonProgressRepository
        _progressRepository;

    public GetLessonProgressQueryHandler(
        ILessonProgressRepository progressRepository)
    {
        _progressRepository =
            progressRepository;
    }

    public async Task<LessonProgressDto?>
        Handle(
            GetLessonProgressQuery request,
            CancellationToken cancellationToken)
    {
        var progress =
            await _progressRepository
                .GetByUserAndLessonAsync(
                    request.UserId,
                    request.LessonId);

        if (progress == null)
        {
            return null;
        }

        return new LessonProgressDto
        {
            UserId = progress.UserId,
            LessonId = progress.LessonId,
            IsCompleted = progress.IsCompleted,
            CompletedAt = progress.CompletedAt
        };
    }
}