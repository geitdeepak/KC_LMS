using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Commands;

public record RegisterUserCommand(
    string FirstName,
    string LastName,
    string Email,
    string Password)
    : IRequest<UserDto>;