using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Queries;
using System.Security.Claims;

namespace KnowledgeCulture.API.Controllers;

[ApiController]
[Route("api/instructor")]
[Authorize(Roles = "Instructor,Admin")]
public class InstructorController : ControllerBase
{
    private readonly IMediator _mediator;

    public InstructorController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("dashboard")]
    public async Task<ActionResult<InstructorDashboardDto>>
        Dashboard()
    {
        var instructorId =
            Guid.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var result =
            await _mediator.Send(
                new GetInstructorDashboardQuery(
                    instructorId));

        return Ok(result);
    }
}