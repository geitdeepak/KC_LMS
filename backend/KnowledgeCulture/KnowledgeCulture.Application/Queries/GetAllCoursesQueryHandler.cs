using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetAllCoursesQueryHandler
    : IRequestHandler<GetAllCoursesQuery, List<CourseDto>>
{
    private readonly ICourseRepository _courseRepository;

    public GetAllCoursesQueryHandler(
        ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<List<CourseDto>> Handle(
        GetAllCoursesQuery request,
        CancellationToken cancellationToken)
    {
        var courses =
            await _courseRepository.GetAllAsync();

        return courses.Select(course =>
            new CourseDto
            {
                Id = course.Id,
                Title = course.Title,
                Description = course.Description,
                Category = course.Category,
                Level = course.Level,
                Status = course.Status
            }).ToList();
    }
}