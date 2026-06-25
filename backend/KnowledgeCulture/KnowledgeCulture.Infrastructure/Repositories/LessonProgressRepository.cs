using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;
using KnowledgeCulture.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeCulture.Infrastructure.Repositories;

public class LessonProgressRepository
    : ILessonProgressRepository
{
    private readonly ApplicationDbContext _context;

    public LessonProgressRepository(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(
        LessonProgress progress)
    {
        await _context.LessonProgresses
            .AddAsync(progress);
    }

    public async Task<LessonProgress?>
        GetByUserAndLessonAsync(
            Guid userId,
            Guid lessonId)
    {
        return await _context.LessonProgresses
            .FirstOrDefaultAsync(
                x => x.UserId == userId &&
                     x.LessonId == lessonId);
    }

    public async Task<List<LessonProgress>>
        GetByUserAsync(Guid userId)
    {
        return await _context.LessonProgresses
            .Where(x => x.UserId == userId)
            .ToListAsync();
    }

    public async Task<int>
    GetCompletedCountAsync(Guid userId)
    {
        return await _context.LessonProgresses
            .CountAsync(x =>
                x.UserId == userId &&
                x.IsCompleted);
    }

    public async Task<int> GetCompletedCountByCourseAsync(
    Guid userId,
    Guid courseId)
    {
        return await _context.LessonProgresses
            .Where(lp =>
                lp.UserId == userId &&
                lp.IsCompleted)
            .Join(
                _context.Lessons,
                lp => lp.LessonId,
                l => l.Id,
                (lp, l) => new { lp, l })
            .Join(
                _context.Modules,
                x => x.l.ModuleId,
                m => m.Id,
                (x, m) => new { x.lp, m })
            .CountAsync(x =>
                x.m.CourseId == courseId);
    }

    public async Task<LessonProgress?> GetLastCompletedLessonAsync(
    Guid userId,
    Guid courseId)
    {
        return await _context.LessonProgresses
            .Include(x => x.Lesson)
                .ThenInclude(x => x.Module)
            .Where(x =>
                x.UserId == userId &&
                x.Lesson.Module.CourseId == courseId &&
                x.IsCompleted)
            .OrderByDescending(x => x.CompletedAt)
            .FirstOrDefaultAsync();
    }

    public async Task<List<LessonProgress>>
    GetCompletedLessonsAsync(
        Guid userId)
    {
        return await _context.LessonProgresses
            .Where(x =>
                x.UserId == userId &&
                x.IsCompleted)
            .ToListAsync();
    }
    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}