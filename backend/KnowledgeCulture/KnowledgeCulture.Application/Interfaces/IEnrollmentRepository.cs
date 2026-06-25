using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Interfaces;

public interface IEnrollmentRepository
{
    Task AddAsync(Enrollment enrollment);

    Task<List<Enrollment>> GetByUserIdAsync(Guid userId);

    Task<Enrollment?> GetByUserAndCourseAsync(
        Guid userId,
        Guid courseId);

    Task<int> GetEnrollmentCountAsync(
    Guid userId);

    Task<List<Enrollment>> GetAllAsync();

    Task SaveChangesAsync();
}