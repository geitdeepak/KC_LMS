using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Commands;

public record EnrollCourseCommand(
    Guid UserId,
    Guid CourseId)
    : IRequest<EnrollmentDto>;