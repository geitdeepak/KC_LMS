using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Interfaces;

public interface IMyCoursesService
{
    Task<List<MyCourseDto>> GetAsync(
        Guid userId);
}