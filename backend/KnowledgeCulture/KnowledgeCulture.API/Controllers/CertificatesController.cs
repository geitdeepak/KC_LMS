using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using KnowledgeCulture.Application.Commands;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Queries;
using KnowledgeCulture.API.Requests;
using System.Security.Claims;

namespace KnowledgeCulture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CertificatesController : ControllerBase
{
    private readonly IMediator _mediator;

    public CertificatesController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("generate")]
    [Authorize]
    public async Task<ActionResult<CertificateDto>>
        Generate(
            GenerateCertificateRequest request)
    {
        var result =
            await _mediator.Send(
                new GenerateCertificateCommand(
                    request.UserId,
                    request.CourseId));

        return Ok(result);
    }

    [HttpGet("my")]
    [Authorize]
    public async Task<ActionResult<
        List<CertificateDto>>>
    GetMyCertificates()
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
                new GetMyCertificatesQuery(
                    userId));

        return Ok(result);
    }
}