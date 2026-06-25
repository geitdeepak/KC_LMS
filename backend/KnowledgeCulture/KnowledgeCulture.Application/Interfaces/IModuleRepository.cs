using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Interfaces;

public interface IModuleRepository
{
    Task AddAsync(Module module);

    Task<Module?> GetByIdAsync(Guid id);

    Task<List<Module>> GetByCourseIdAsync(Guid courseId);

    Task<List<Module>> GetAllAsync();

    Task SaveChangesAsync();
}