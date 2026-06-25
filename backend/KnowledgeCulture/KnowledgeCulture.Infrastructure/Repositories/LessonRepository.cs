using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;
using KnowledgeCulture.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeCulture.Infrastructure.Repositories;

public class LessonRepository : ILessonRepository
{
    private readonly ApplicationDbContext _context;

    public LessonRepository(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Lesson lesson)
    {
        await _context.Lessons.AddAsync(lesson);
    }

    public async Task<Lesson?> GetByIdAsync(Guid id)
    {
        return await _context.Lessons
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<List<Lesson>> GetByModuleIdAsync(Guid moduleId)
    {
        return await _context.Lessons
            .Where(x => x.ModuleId == moduleId)
            .OrderBy(x => x.Order)
            .ToListAsync();
    }

    public async Task<List<Lesson>> GetAllAsync()
    {
        return await _context.Lessons
            .ToListAsync();
    }

    public async Task<int> GetLessonCountByCourseAsync(
    Guid courseId)
    {
        return await _context.Lessons
            .Where(x =>
                x.Module != null &&
                x.Module.CourseId == courseId)
            .CountAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}