using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.DTOs;

public class CoursePlayerDto
{
    public CourseDetailsDto Course { get; set; }
        = new();

    public LessonDto? CurrentLesson { get; set; }

    public QuizDto? CurrentQuiz { get; set; }

    public decimal Progress { get; set; }
}