namespace KnowledgeCulture.Domain.Entities;

public class Course
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public string Level { get; set; } = string.Empty;

    public string ThumbnailUrl { get; set; } = string.Empty;

    public string Status { get; set; } = "Draft";

    public Guid CreatedBy { get; set; }

    public DateTime CreatedAt { get; set; }
        = DateTime.UtcNow;

    public DateTime? PublishedAt { get; set; }

    // Navigation Properties

    public ICollection<Module> Modules { get; set; }
        = new List<Module>();

    public ICollection<Enrollment> Enrollments { get; set; }
        = new List<Enrollment>();
}