namespace KnowledgeCulture.Application.DTOs;

public class CreateLessonRequest
{
    public Guid ModuleId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string LessonType { get; set; } = string.Empty;

    public string NotesUrl { get; set; } = string.Empty;

    public string VideoUrl { get; set; } = string.Empty;

    public string ProjectUrl { get; set; } = string.Empty;

    public int Order { get; set; }
}