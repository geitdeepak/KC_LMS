using MediatR;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Commands;

public class PublishCourseCommandHandler
    : IRequestHandler<PublishCourseCommand, Unit>
{
    private readonly ICourseRepository _courseRepository;

    public PublishCourseCommandHandler(
        ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<Unit> Handle(
    PublishCourseCommand request,
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

        if (course.CreatedBy != request.UserId)
            throw new UnauthorizedAccessException(
                "You can only publish your own courses.");

        course.Status = "Published";

        course.PublishedAt = DateTime.UtcNow;

        await _courseRepository.SaveChangesAsync();

        return Unit.Value;
    }
}