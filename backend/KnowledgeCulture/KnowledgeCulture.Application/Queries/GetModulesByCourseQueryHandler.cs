using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Queries;

public class GetModulesByCourseQueryHandler
    : IRequestHandler<
        GetModulesByCourseQuery,
        List<ModuleDto>>
{
    private readonly IModuleRepository
        _moduleRepository;

    public GetModulesByCourseQueryHandler(
        IModuleRepository moduleRepository)
    {
        _moduleRepository =
            moduleRepository;
    }

    public async Task<List<ModuleDto>>
        Handle(
            GetModulesByCourseQuery request,
            CancellationToken cancellationToken)
    {
        var modules =
            await _moduleRepository
                .GetByCourseIdAsync(
                    request.CourseId);

        return modules
            .Select(m =>
                new ModuleDto
                {
                    Id = m.Id,
                    CourseId = m.CourseId,
                    Title = m.Title,
                    Description = m.Description,
                    Order = m.Order
                })
            .ToList();
    }
}