namespace KnowledgeCulture.Application.DTOs;

public class CreateModuleRequest
{
    public Guid CourseId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int Order { get; set; }
}