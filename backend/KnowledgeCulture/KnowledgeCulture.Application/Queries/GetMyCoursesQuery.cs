using KnowledgeCulture.Application.DTOs;
using MediatR;

namespace KnowledgeCulture.Application.Queries;

public class GetMyCoursesQuery
    : IRequest<List<MyCourseDto>>
{
    public Guid UserId { get; }

    public GetMyCoursesQuery(
        Guid userId)
    {
        UserId = userId;
    }
}