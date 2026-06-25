using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Commands;

public class CreateCourseCommandHandler
    : IRequestHandler<CreateCourseCommand, CourseDto>
{
    private readonly ICourseRepository _courseRepository;

    public CreateCourseCommandHandler(
        ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<CourseDto> Handle(
        CreateCourseCommand request,
        CancellationToken cancellationToken)
    {
        var course = new Course
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Description = request.Description,
            Category = request.Category,
            Level = request.Level,
            ThumbnailUrl = request.ThumbnailUrl,
            Status = "Draft",
            CreatedBy = request.CreatedBy,
            CreatedAt = DateTime.UtcNow
        };

        await _courseRepository.AddAsync(course);

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