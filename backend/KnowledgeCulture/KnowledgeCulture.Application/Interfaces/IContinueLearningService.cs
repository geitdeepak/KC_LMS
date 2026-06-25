using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Interfaces;

public interface IContinueLearningService
{
    Task<ContinueLearningDto?> GetAsync(
        Guid userId);
}