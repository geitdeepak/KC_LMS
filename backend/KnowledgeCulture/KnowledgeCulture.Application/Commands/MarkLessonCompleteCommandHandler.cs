using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Commands;

public class MarkLessonCompleteCommandHandler
    : IRequestHandler<
        MarkLessonCompleteCommand,
        MarkLessonCompleteDto>
{
    private readonly ILessonProgressRepository
        _progressRepository;

    private readonly ILessonRepository
    _lessonRepository;

    public MarkLessonCompleteCommandHandler(
    ILessonProgressRepository progressRepository,
    ILessonRepository lessonRepository)
    {
        _progressRepository =
            progressRepository;

        _lessonRepository =
            lessonRepository;
    }

    public async Task<MarkLessonCompleteDto>
        Handle(
            MarkLessonCompleteCommand request,
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

        var progress =
            await _progressRepository
                .GetByUserAndLessonAsync(
                    request.UserId,
                    request.LessonId);

        if (progress == null)
        {
            progress = new LessonProgress
            {
                Id = Guid.NewGuid(),

                UserId =
                    request.UserId,

                LessonId =
                    request.LessonId,

                IsCompleted = true,

                CompletedAt =
                    DateTime.UtcNow
            };

            await _progressRepository
                .AddAsync(progress);
        }
        else
        {
            progress.IsCompleted = true;

            progress.CompletedAt =
                DateTime.UtcNow;
        }

        await _progressRepository
            .SaveChangesAsync();

        return new MarkLessonCompleteDto
        {
            LessonId =
                progress.LessonId,

            IsCompleted =
                progress.IsCompleted,

            CompletedAt =
                progress.CompletedAt
        };
    }
}