using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Queries;

namespace KnowledgeCulture.API.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdminController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("dashboard")]
    public async Task<ActionResult<AdminDashboardDto>>
        Dashboard()
    {
        var result =
            await _mediator.Send(
                new GetAdminDashboardQuery());

        return Ok(result);
    }
}