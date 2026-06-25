using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Commands;

public class CompleteLessonCommandHandler
    : IRequestHandler<CompleteLessonCommand, LessonProgressDto>
{
    private readonly ILessonProgressRepository _progressRepository;
    private readonly ILessonRepository _lessonRepository;
    private readonly IModuleRepository _moduleRepository;
    private readonly ICourseRepository _courseRepository;
    private readonly ICertificateRepository _certificateRepository;

    public CompleteLessonCommandHandler(
        ILessonProgressRepository progressRepository,
        ILessonRepository lessonRepository,
        IModuleRepository moduleRepository,
        ICourseRepository courseRepository,
        ICertificateRepository certificateRepository)
    {
        _progressRepository = progressRepository;
        _lessonRepository = lessonRepository;
        _moduleRepository = moduleRepository;
        _courseRepository = courseRepository;
        _certificateRepository = certificateRepository;
    }

    public async Task<LessonProgressDto> Handle(
        CompleteLessonCommand request,
        CancellationToken cancellationToken)
    {
        var existing =
            await _progressRepository
                .GetByUserAndLessonAsync(
                    request.UserId,
                    request.LessonId);

        LessonProgress progress;

        if (existing != null)
        {
            existing.IsCompleted = true;
            existing.CompletedAt = DateTime.UtcNow;

            progress = existing;
        }
        else
        {
            progress = new LessonProgress
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                LessonId = request.LessonId,
                IsCompleted = true,
                CompletedAt = DateTime.UtcNow
            };

            await _progressRepository.AddAsync(progress);
        }

        await _progressRepository.SaveChangesAsync();

        // ------------------------------------
        // Automatic Course Completion Check
        // ------------------------------------

        var lesson =
            await _lessonRepository.GetByIdAsync(
                request.LessonId);

        if (lesson != null)
        {
            var module =
                await _moduleRepository.GetByIdAsync(
                    lesson.ModuleId);

            if (module != null)
            {
                var courseId = module.CourseId;

                var totalLessons =
                    await _lessonRepository
                        .GetLessonCountByCourseAsync(
                            courseId);

                var completedLessons =
                    await _progressRepository
                        .GetCompletedCountByCourseAsync(
                            request.UserId,
                            courseId);

                if (totalLessons > 0 &&
                    completedLessons >= totalLessons)
                {
                    var existingCertificate =
                        await _certificateRepository
                            .GetByUserAndCourseAsync(
                                request.UserId,
                                courseId);

                    if (existingCertificate == null)
                    {
                        var certificate =
                            new Certificate
                            {
                                Id = Guid.NewGuid(),
                                UserId = request.UserId,
                                CourseId = courseId,
                                CertificateNumber =
                                    $"CERT-{Guid.NewGuid().ToString("N")[..8].ToUpper()}",
                                IssuedAt = DateTime.UtcNow
                            };

                        await _certificateRepository
                            .AddAsync(certificate);

                        await _certificateRepository
                            .SaveChangesAsync();
                    }
                }
            }
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