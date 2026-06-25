using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Interfaces;

public interface ICourseRepository
{
    Task AddAsync(Course course);

    Task<Course?> GetByIdAsync(Guid id);


    Task<List<Course>> GetAllAsync();

    Task DeleteAsync(Course course);

    Task<List<Course>>
    GetByCreatedByAsync(
        Guid createdBy);

    Task<int> GetTotalLessonCountAsync(Guid courseId);

    Task<Course?> GetCourseWithModulesAsync(
    Guid courseId);

    Task SaveChangesAsync();
}