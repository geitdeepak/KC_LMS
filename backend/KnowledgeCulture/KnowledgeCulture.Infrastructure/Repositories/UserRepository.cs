using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;
using KnowledgeCulture.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeCulture.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByEmailAsync(
        string email)
    {
        return await _context.Users
            .FirstOrDefaultAsync(
                x => x.Email == email);
    }

    public async Task<User?> GetByIdAsync(
        Guid id)
    {
        return await _context.Users
            .FirstOrDefaultAsync(
                x => x.Id == id);
    }

    public async Task<List<User>>
    GetAllAsync()
    {
        return await _context.Users
            .ToListAsync();
    }

    public async Task AddAsync(User user)
    {
        await _context.Users.AddAsync(user);
    }

    public async Task<int> GetLessonCountByCourseAsync(
    Guid courseId)
    {
        return await _context.Lessons
            .CountAsync(x =>
                x.Module != null &&
                x.Module.CourseId == courseId);
    }
    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}