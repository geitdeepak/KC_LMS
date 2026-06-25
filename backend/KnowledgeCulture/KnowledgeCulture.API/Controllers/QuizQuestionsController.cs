using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using KnowledgeCulture.Application.Commands;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.API.Requests;
using KnowledgeCulture.Application.Queries;

namespace KnowledgeCulture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuizQuestionsController : ControllerBase
{
    private readonly IMediator _mediator;

    public QuizQuestionsController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [Authorize(Roles = "Instructor,Admin")]
    public async Task<ActionResult<QuizQuestionDto>>
        Create(CreateQuizQuestionRequest request)
    {
        var result =
            await _mediator.Send(
                new CreateQuizQuestionCommand(
                    request.QuizId,
                    request.Question,
                    request.OptionA,
                    request.OptionB,
                    request.OptionC,
                    request.OptionD,
                    request.CorrectAnswer,
                    request.Marks));

        return Ok(result);
    }

    [HttpGet("quiz/{quizId}")]
    public async Task<ActionResult<List<QuizQuestionDto>>>
    GetByQuiz(Guid quizId)
    {
        var result =
            await _mediator.Send(
                new GetQuizQuestionsQuery(
                    quizId));

        return Ok(result);
    }
}