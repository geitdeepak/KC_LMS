using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Interfaces;

public interface ILessonProgressRepository
{
    Task AddAsync(LessonProgress progress);

    Task<LessonProgress?> GetByUserAndLessonAsync(
        Guid userId,
        Guid lessonId);

    Task<List<LessonProgress>> GetByUserAsync(
        Guid userId);

    Task<int> GetCompletedCountAsync(
        Guid userId);

    Task<int> GetCompletedCountByCourseAsync(
        Guid userId,
        Guid courseId);

    // NEW
    Task<List<LessonProgress>> GetCompletedLessonsAsync(
        Guid userId);

    Task SaveChangesAsync();
}