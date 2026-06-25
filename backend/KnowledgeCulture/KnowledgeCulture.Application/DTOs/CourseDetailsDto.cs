namespace KnowledgeCulture.Application.DTOs;

public class CourseDetailsDto
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string ThumbnailUrl { get; set; } = string.Empty;

    public List<ModuleDetailsDto> Modules { get; set; }
        = new();
}

public class ModuleDetailsDto
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public List<LessonDetailsDto> Lessons { get; set; }
        = new();
}

public class LessonDetailsDto
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public bool IsCompleted { get; set; }
}