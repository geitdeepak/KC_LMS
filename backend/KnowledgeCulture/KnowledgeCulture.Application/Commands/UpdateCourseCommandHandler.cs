using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Commands;

public class UpdateCourseCommandHandler
    : IRequestHandler<UpdateCourseCommand, CourseDto>
{
    private readonly ICourseRepository _courseRepository;

    public UpdateCourseCommandHandler(
        ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<CourseDto> Handle(
    UpdateCourseCommand request,
    CancellationToken cancellationToken)
    {
        var course =
            await _courseRepository.GetByIdAsync(
                request.Id);

        if (course == null)
            throw new Exception(
                "Course not found");

        if (course.CreatedBy != request.UserId)
            throw new UnauthorizedAccessException(
                "You can only update your own courses.");

        course.Title = request.Title;
        course.Description = request.Description;
        course.Category = request.Category;
        course.Level = request.Level;
        course.ThumbnailUrl = request.ThumbnailUrl;

        await _courseRepository.SaveChangesAsync();

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
