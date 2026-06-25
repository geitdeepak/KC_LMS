using MediatR;
using Microsoft.AspNetCore.Mvc;
using KnowledgeCulture.Application.Commands;
using KnowledgeCulture.Application.DTOs;
using Microsoft.AspNetCore.RateLimiting;

namespace KnowledgeCulture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;

    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("register")]
    [EnableRateLimiting("AuthPolicy")]
    public async Task<ActionResult<UserDto>> Register(
        RegisterRequest request)
    {
        var result = await _mediator.Send(
            new RegisterUserCommand(
                request.FirstName,
                request.LastName,
                request.Email,
                request.Password));

        return Ok(result);
    }

    [HttpPost("login")]
    [EnableRateLimiting("AuthPolicy")]
    public async Task<ActionResult<LoginResponse>> Login(
        LoginRequest request)
    {
        var result = await _mediator.Send(
            new LoginUserCommand(
                request.Email,
                request.Password));

        return Ok(result);
    }
}