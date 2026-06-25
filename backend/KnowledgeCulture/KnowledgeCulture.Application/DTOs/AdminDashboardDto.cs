namespace KnowledgeCulture.Application.DTOs;

public class AdminDashboardDto
{
    public int TotalUsers { get; set; }

    public int TotalLearners { get; set; }

    public int TotalInstructors { get; set; }

    public int TotalAdmins { get; set; }

    public int TotalCourses { get; set; }

    public int PublishedCourses { get; set; }

    public int DraftCourses { get; set; }

    public int TotalModules { get; set; }

    public int TotalLessons { get; set; }

    public int TotalQuizzes { get; set; }

    public int TotalEnrollments { get; set; }

    public int TotalCertificates { get; set; }
}