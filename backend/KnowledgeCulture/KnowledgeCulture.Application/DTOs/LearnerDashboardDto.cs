namespace KnowledgeCulture.Application.DTOs;

public class LearnerDashboardDto
{
    public int TotalEnrollments { get; set; }

    public int LessonsCompleted { get; set; }

    public int CoursesCompleted { get; set; }

    public decimal OverallProgress { get; set; }
}