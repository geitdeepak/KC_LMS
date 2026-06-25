using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Interfaces;

public interface ICertificateRepository
{
    Task AddAsync(
        Certificate certificate);

    Task<Certificate?> GetByUserAndCourseAsync(
        Guid userId,
        Guid courseId);

    Task<List<Certificate>> GetAllAsync();

    Task<List<Certificate>> GetByUserIdAsync(
    Guid userId);

    Task SaveChangesAsync();
}