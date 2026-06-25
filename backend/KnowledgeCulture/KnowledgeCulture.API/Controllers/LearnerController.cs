using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Queries;
using KnowledgeCulture.Application.Commands;

namespace KnowledgeCulture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Learner")]
public class LearnerController : ControllerBase
{
    private readonly IMediator _mediator;

    public LearnerController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("dashboard")]
    public async Task<ActionResult<LearnerDashboardDto>>
        Dashboard()
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
                new GetLearnerDashboardQuery(
                    userId));

        return Ok(result);
    }

    [HttpGet("courses")]
    public async Task<ActionResult<List<MyCourseDto>>>
        GetMyCourses()
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
                new GetMyCoursesQuery(
                    userId));

        return Ok(result);
    }

    [HttpGet("courses/{courseId}")]
    public async Task<ActionResult<CourseDetailsDto>>
        GetCourseDetails(Guid courseId)
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
                new GetCourseDetailsQuery(
                    userId,
                    courseId));

        return Ok(result);
    }

    [HttpPost("lessons/{lessonId}/complete")]
    public async Task<ActionResult<
    MarkLessonCompleteDto>>
    CompleteLesson(Guid lessonId)
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
                new MarkLessonCompleteCommand(
                    userId,
                    lessonId));

        return Ok(result);
    }

    [HttpGet("lessons/{lessonId}/progress")]
    public async Task<ActionResult<LessonProgressDto?>>
    GetLessonProgress(Guid lessonId)
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
                new GetLessonProgressQuery(
                    userId,
                    lessonId));

        return Ok(result);
    }

    [HttpGet("certificates")]
    public async Task<ActionResult<
    List<CertificateDto>>>
    GetCertificates()
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