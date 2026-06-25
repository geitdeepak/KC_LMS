using MediatR;
using Microsoft.AspNetCore.Mvc;
using KnowledgeCulture.Application.Commands;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Queries;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace KnowledgeCulture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly IMediator _mediator;

    public CoursesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [Authorize(Roles = "Instructor,Admin")]
    public async Task<ActionResult<CourseDto>> Create(
        CreateCourseRequest request)
    {
        var userIdClaim =
            User.FindFirst(
                ClaimTypes.NameIdentifier);

        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId =
            Guid.Parse(
                userIdClaim.Value);

        var result =
            await _mediator.Send(
                new CreateCourseCommand(
                    request.Title,
                    request.Description,
                    request.Category,
                    request.Level,
                    request.ThumbnailUrl,
                    userId));

        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult<List<CourseDto>>>
    GetAll()
    {
        var result =
            await _mediator.Send(
                new GetAllCoursesQuery());

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CourseDto>>
    GetById(Guid id)
    {
        var result =
            await _mediator.Send(
                new GetCourseByIdQuery(id));

        return Ok(result);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Instructor,Admin")]
    public async Task<ActionResult<CourseDto>>
    Update(
        Guid id,
        UpdateCourseRequest request)
    {
        var userIdClaim =
            User.FindFirst(
                ClaimTypes.NameIdentifier);

        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId =
            Guid.Parse(
                userIdClaim.Value);

        var result =
            await _mediator.Send(
                new UpdateCourseCommand(
                    id,
                    request.Title,
                    request.Description,
                    request.Category,
                    request.Level,
                    request.ThumbnailUrl,
                    userId));

        return Ok(result);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Instructor,Admin")]
    public async Task<ActionResult>
    Delete(Guid id)
    {
        var userIdClaim =
            User.FindFirst(
                ClaimTypes.NameIdentifier);

        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId =
            Guid.Parse(
                userIdClaim.Value);

        await _mediator.Send(
            new DeleteCourseCommand(
                id,
                userId));

        return NoContent();
    }

    [HttpPost("{id}/publish")]
    [Authorize(Roles = "Instructor,Admin")]
    public async Task<ActionResult>
    Publish(Guid id)
    {
        var userIdClaim =
            User.FindFirst(
                ClaimTypes.NameIdentifier);

        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId =
            Guid.Parse(
                userIdClaim.Value);

        await _mediator.Send(
            new PublishCourseCommand(
                id,
                userId));

        return Ok(new
        {
            Message = "Course published successfully"
        });
    }
}