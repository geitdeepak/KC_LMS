using MediatR;
using Microsoft.AspNetCore.Mvc;
using KnowledgeCulture.Application.Commands;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Queries;
using Microsoft.AspNetCore.Authorization;

namespace KnowledgeCulture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class LessonsController : ControllerBase
{
    private readonly IMediator _mediator;

    public LessonsController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [Authorize(Roles = "Instructor,Admin")]
    public async Task<ActionResult<LessonDto>>
        Create(CreateLessonRequest request)
    {
        var result =
            await _mediator.Send(
                new CreateLessonCommand(
                    request.ModuleId,
                    request.Title,
                    request.Description,
                    request.LessonType,
                    request.NotesUrl,
                    request.VideoUrl,
                    request.ProjectUrl,
                    request.Order));

        return Ok(result);
    }

    [HttpGet("module/{moduleId}")]
    public async Task<ActionResult<List<LessonDto>>>
        GetByModule(Guid moduleId)
    {
        var result =
            await _mediator.Send(
                new GetLessonsByModuleQuery(
                    moduleId));

        return Ok(result);
    }

    [HttpGet("{lessonId}")]
    public async Task<ActionResult<LessonDto>>
        GetById(Guid lessonId)
    {
        var result =
            await _mediator.Send(
                new GetLessonByIdQuery(
                    lessonId));

        return Ok(result);
    }
}