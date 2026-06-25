using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;
using KnowledgeCulture.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeCulture.Infrastructure.Repositories;

public class CertificateRepository
    : ICertificateRepository
{
    private readonly ApplicationDbContext _context;

    public CertificateRepository(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(
        Certificate certificate)
    {
        await _context.Certificates
            .AddAsync(certificate);
    }

    public async Task<Certificate?>
        GetByUserAndCourseAsync(
            Guid userId,
            Guid courseId)
    {
        return await _context.Certificates
            .FirstOrDefaultAsync(x =>
                x.UserId == userId &&
                x.CourseId == courseId);
    }

    public async Task<List<Certificate>>
    GetAllAsync()
    {
        return await _context.Certificates
            .ToListAsync();
    }

    public async Task<List<Certificate>>
    GetByUserIdAsync(
    Guid userId)
    {
        return await _context.Certificates
            .Include(x => x.Course)
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.IssuedAt)
            .ToListAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}