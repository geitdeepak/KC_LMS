using MediatR;
using Microsoft.AspNetCore.Mvc;
using KnowledgeCulture.Application.Commands;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Queries;
using Microsoft.AspNetCore.Authorization;

namespace KnowledgeCulture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ModulesController : ControllerBase
{
    private readonly IMediator _mediator;

    public ModulesController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [Authorize(Roles = "Instructor,Admin")]
    public async Task<ActionResult<ModuleDto>>
        Create(CreateModuleRequest request)
    {
        var result =
            await _mediator.Send(
                new CreateModuleCommand(
                    request.CourseId,
                    request.Title,
                    request.Description,
                    request.Order));

        return Ok(result);
    }

    [HttpGet("course/{courseId}")]
    public async Task<ActionResult<List<ModuleDto>>>
    GetByCourse(Guid courseId)
    {
        var result =
            await _mediator.Send(
                new GetModulesByCourseQuery(
                    courseId));

        return Ok(result);
    }
}