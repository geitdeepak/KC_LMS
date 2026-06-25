using MediatR;
using Microsoft.AspNetCore.Mvc;
using KnowledgeCulture.Application.Commands;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Queries;

namespace KnowledgeCulture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EnrollmentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public EnrollmentsController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<EnrollmentDto>>
        Enroll(EnrollCourseRequest request)
    {
        var result =
            await _mediator.Send(
                new EnrollCourseCommand(
                    request.UserId,
                    request.CourseId));

        return Ok(result);
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<List<EnrollmentDto>>>
        GetByUser(Guid userId)
    {
        var result =
            await _mediator.Send(
                new GetEnrollmentsByUserQuery(
                    userId));

        return Ok(result);
    }
}