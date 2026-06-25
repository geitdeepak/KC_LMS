using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;
using KnowledgeCulture.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeCulture.Infrastructure.Repositories;

public class EnrollmentRepository
    : IEnrollmentRepository
{
    private readonly ApplicationDbContext _context;

    public EnrollmentRepository(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(
        Enrollment enrollment)
    {
        await _context.Enrollments
            .AddAsync(enrollment);
    }

    public async Task<List<Enrollment>>
        GetByUserIdAsync(Guid userId)
    {
        return await _context.Enrollments
            .Where(x => x.UserId == userId)
            .ToListAsync();
    }

    public async Task<Enrollment?>
        GetByUserAndCourseAsync(
            Guid userId,
            Guid courseId)
    {
        return await _context.Enrollments
            .FirstOrDefaultAsync(
                x => x.UserId == userId &&
                     x.CourseId == courseId);
    }

    public async Task<int>
    GetEnrollmentCountAsync(Guid userId)
    {
        return await _context.Enrollments
            .CountAsync(x =>
                x.UserId == userId);
    }

    public async Task<List<Enrollment>>
    GetAllAsync()
    {
        return await _context.Enrollments
            .ToListAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}