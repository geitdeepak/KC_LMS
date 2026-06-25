using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;
using KnowledgeCulture.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeCulture.Infrastructure.Repositories;

public class ModuleRepository : IModuleRepository
{
    private readonly ApplicationDbContext _context;

    public ModuleRepository(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Module module)
    {
        await _context.Modules.AddAsync(module);
    }

    public async Task<Module?> GetByIdAsync(Guid id)
    {
        return await _context.Modules
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<List<Module>> GetByCourseIdAsync(Guid courseId)
    {
        return await _context.Modules
            .Where(x => x.CourseId == courseId)
            .OrderBy(x => x.Order)
            .ToListAsync();
    }

    public async Task<List<Module>> GetAllAsync()
    {
        return await _context.Modules
            .ToListAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}