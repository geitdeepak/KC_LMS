using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Commands;

public class RegisterUserCommandHandler
    : IRequestHandler<RegisterUserCommand, UserDto>
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;

    public RegisterUserCommandHandler(
        IUserRepository userRepository,
        IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task<UserDto> Handle(
        RegisterUserCommand request,
        CancellationToken cancellationToken)
    {
        var existingUser =
            await _userRepository.GetByEmailAsync(
                request.Email);

        if (existingUser != null)
        {
            throw new Exception(
                "User already exists.");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            PasswordHash =
                _passwordHasher.HashPassword(
                    request.Password),
            Role = "Learner",
            IsActive = true
        };

        await _userRepository.AddAsync(user);

        await _userRepository.SaveChangesAsync();

        return new UserDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Role = user.Role
        };
    }
}