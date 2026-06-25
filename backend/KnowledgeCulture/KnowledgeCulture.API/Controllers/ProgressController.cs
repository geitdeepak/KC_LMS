using MediatR;
using Microsoft.AspNetCore.Mvc;
using KnowledgeCulture.Application.Commands;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Queries;

namespace KnowledgeCulture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProgressController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProgressController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    // ============================================
    // Complete Lesson
    // ============================================

    [HttpPost("complete")]
    public async Task<ActionResult<LessonProgressDto>>
        CompleteLesson(
            CompleteLessonRequest request)
    {
        var result =
            await _mediator.Send(
                new CompleteLessonCommand(
                    request.UserId,
                    request.LessonId));

        return Ok(result);
    }

    // ============================================
    // User Progress
    // ============================================

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<List<LessonProgressDto>>>
        GetProgress(Guid userId)
    {
        var result =
            await _mediator.Send(
                new GetUserProgressQuery(
                    userId));

        return Ok(result);
    }

    // ============================================
    // Course Progress
    // ============================================

    [HttpGet("course/{courseId}/user/{userId}")]
    public async Task<ActionResult<CourseProgressDto>>
        GetCourseProgress(
            Guid courseId,
            Guid userId)
    {
        var result =
            await _mediator.Send(
                new GetCourseProgressQuery(
                    userId,
                    courseId));

        return Ok(result);
    }

    // ============================================
    // Continue Learning
    // ============================================

    [HttpGet("continue-learning/{userId}")]
    public async Task<ActionResult<ContinueLearningDto?>>
        GetContinueLearning(
            Guid userId)
    {
        var result =
            await _mediator.Send(
                new GetContinueLearningQuery(
                    userId));

        return Ok(result);
    }

    // ============================================
    // My Courses
    // ============================================

    [HttpGet("my-courses/{userId}")]
    public async Task<ActionResult<List<MyCourseDto>>>
        GetMyCourses(
            Guid userId)
    {
        var result =
            await _mediator.Send(
                new GetMyCoursesQuery(
                    userId));

        return Ok(result);
    }

    // ============================================
    // Dashboard
    // ============================================

    [HttpGet("dashboard/{userId}")]
    public async Task<ActionResult<LearnerDashboardDto>>
        Dashboard(Guid userId)
    {
        var result =
            await _mediator.Send(
                new GetLearnerDashboardQuery(
                    userId));

        return Ok(result);
    }
}