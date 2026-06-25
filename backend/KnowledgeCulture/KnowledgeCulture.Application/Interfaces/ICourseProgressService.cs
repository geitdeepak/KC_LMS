using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Interfaces;

public interface ICourseProgressService
{
    Task<CourseProgressDto> GetProgressAsync(
        Guid userId,
        Guid courseId);
}