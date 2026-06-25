using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;
using KnowledgeCulture.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeCulture.Infrastructure.Repositories;

public class CourseRepository : ICourseRepository
{
    private readonly ApplicationDbContext _context;

    public CourseRepository(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Course course)
    {
        await _context.Courses.AddAsync(course);
    }

    public async Task<Course?> GetByIdAsync(Guid id)
    {
        return await _context.Courses
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Course?>
        GetCourseWithModulesAsync(Guid courseId)
    {
        return await _context.Courses
            .Include(x => x.Modules)
            .ThenInclude(x => x.Lessons)
            .FirstOrDefaultAsync(
                x => x.Id == courseId);
    }

    public async Task<List<Course>> GetAllAsync()
    {
        return await _context.Courses
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
    }

    public async Task<int> GetTotalLessonCountAsync(
    Guid courseId)
    {
        return await _context.Modules
            .Where(m => m.CourseId == courseId)
            .SelectMany(m => m.Lessons)
            .CountAsync();
    }
    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Course course)
    {
        _context.Courses.Remove(course);

        await Task.CompletedTask;
    }

    public async Task<List<Course>>
    GetByCreatedByAsync(
        Guid createdBy)
    {
        return await _context.Courses
            .Where(x => x.CreatedBy == createdBy)
            .ToListAsync();
    }
}