using MediatR;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Commands;

public class DeleteCourseCommandHandler
    : IRequestHandler<DeleteCourseCommand, Unit>
{
    private readonly ICourseRepository _courseRepository;

    public DeleteCourseCommandHandler(
        ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<Unit> Handle(
    DeleteCourseCommand request,
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
                "You can only delete your own courses.");

        await _courseRepository.DeleteAsync(
            course);

        await _courseRepository.SaveChangesAsync();

        return Unit.Value;
    }
}