using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Interfaces;

public interface ILessonRepository
{
    Task AddAsync(Lesson lesson);

    Task<Lesson?> GetByIdAsync(Guid id);

    Task<List<Lesson>> GetByModuleIdAsync(Guid moduleId);

    Task<List<Lesson>> GetAllAsync();

    Task<int> GetLessonCountByCourseAsync(Guid courseId);

    Task SaveChangesAsync();

}