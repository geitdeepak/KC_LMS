namespace KnowledgeCulture.Application.DTOs;

public class CourseDto
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public string Level { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;
}