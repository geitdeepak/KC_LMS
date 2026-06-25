using MediatR;
using Microsoft.AspNetCore.Mvc;
using KnowledgeCulture.Application.Commands;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Queries;
using KnowledgeCulture.API.Requests;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace KnowledgeCulture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuizzesController : ControllerBase
{
    private readonly IMediator _mediator;

    public QuizzesController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [Authorize(Roles = "Instructor,Admin")]
    public async Task<ActionResult<QuizDto>>
        Create(CreateQuizRequest request)
    {
        var result =
            await _mediator.Send(
                new CreateQuizCommand(
                    request.LessonId,
                    request.Title,
                    request.PassingScore));

        return Ok(result);
    }

    [HttpGet("lesson/{lessonId}")]
    [Authorize(Roles = "Learner")]
    public async Task<ActionResult<List<QuizDto>>>
    GetByLesson(Guid lessonId)
    {
        var result =
            await _mediator.Send(
                new GetQuizzesByLessonQuery(
                    lessonId));

        return Ok(result);
    }

    [HttpGet("{quizId}/questions")]
    [Authorize(Roles = "Learner")]
    public async Task<ActionResult<
    List<QuizQuestionDto>>>
    GetQuestions(Guid quizId)
    {
        var result =
            await _mediator.Send(
                new GetQuizQuestionsQuery(
                    quizId));

        return Ok(result);
    }


    [HttpPost("submit")]
    [Authorize]
    public async Task<ActionResult<QuizResultDto>>
    Submit(SubmitQuizRequest request)
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
                new SubmitQuizCommand(
                    request.QuizId,
                    userId,
                    request.Answers
                        .Select(x =>
                            new SubmitQuizAnswerDto
                            {
                                QuestionId =
                                    x.QuestionId,

                                SelectedAnswer =
                                    x.SelectedAnswer
                            })
                        .ToList()));

        return Ok(result);
    }

    [HttpGet("{quizId}/status")]
    [Authorize]
    public async Task<ActionResult<QuizStatusDto>>
GetStatus(Guid quizId)
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
                new GetQuizStatusQuery(
                    userId,
                    quizId));

        return Ok(result);
    }
}