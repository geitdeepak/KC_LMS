using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetCourseByIdQueryHandler
    : IRequestHandler<GetCourseByIdQuery, CourseDto?>
{
    private readonly ICourseRepository _courseRepository;

    public GetCourseByIdQueryHandler(
        ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<CourseDto?> Handle(
        GetCourseByIdQuery request,
        CancellationToken cancellationToken)
    {
        var course =
            await _courseRepository.GetByIdAsync(
                request.Id);

        if (course == null)
        {
            throw new KeyNotFoundException(
                "Course not found.");
        }

        return new CourseDto
        {
            Id = course.Id,
            Title = course.Title,
            Description = course.Description,
            Category = course.Category,
            Level = course.Level,
            Status = course.Status
        };
    }
}