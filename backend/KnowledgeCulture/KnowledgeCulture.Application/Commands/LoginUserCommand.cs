using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Commands;

public record LoginUserCommand(
    string Email,
    string Password)
    : IRequest<LoginResponse>;