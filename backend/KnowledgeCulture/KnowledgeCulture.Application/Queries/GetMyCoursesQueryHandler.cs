using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetMyCoursesQueryHandler
    : IRequestHandler<
        GetMyCoursesQuery,
        List<MyCourseDto>>
{
    private readonly IMyCoursesService
        _myCoursesService;

    public GetMyCoursesQueryHandler(
        IMyCoursesService myCoursesService)
    {
        _myCoursesService =
            myCoursesService;
    }

    public async Task<List<MyCourseDto>>
        Handle(
            GetMyCoursesQuery request,
            CancellationToken cancellationToken)
    {
        return await _myCoursesService
            .GetAsync(request.UserId);
    }
}