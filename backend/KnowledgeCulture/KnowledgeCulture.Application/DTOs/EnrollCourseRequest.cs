namespace KnowledgeCulture.Application.DTOs;

public class EnrollCourseRequest
{
    public Guid UserId { get; set; }

    public Guid CourseId { get; set; }
}