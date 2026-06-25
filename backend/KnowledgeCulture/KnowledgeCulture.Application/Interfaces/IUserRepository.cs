using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);

    Task<User?> GetByIdAsync(Guid id);

    Task<List<User>> GetAllAsync();

    Task AddAsync(User user);

    Task SaveChangesAsync();
}