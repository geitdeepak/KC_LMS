namespace KnowledgeCulture.Application.DTOs;

public class UpdateCourseRequest
{
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public string Level { get; set; } = string.Empty;

    public string ThumbnailUrl { get; set; } = string.Empty;
}