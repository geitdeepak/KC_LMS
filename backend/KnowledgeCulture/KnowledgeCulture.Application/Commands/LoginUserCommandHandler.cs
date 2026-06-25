using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;

namespace KnowledgeCulture.Application.Commands;

public class LoginUserCommandHandler
    : IRequestHandler<LoginUserCommand, LoginResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public LoginUserCommandHandler(
        IUserRepository userRepository,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<LoginResponse> Handle(
        LoginUserCommand request,
        CancellationToken cancellationToken)
    {
        var user =
            await _userRepository.GetByEmailAsync(
                request.Email);

        if (user == null)
        {
            throw new Exception("Invalid credentials.");
        }

        var isValid =
            _passwordHasher.VerifyPassword(
                request.Password,
                user.PasswordHash);

        if (!isValid)
        {
            throw new Exception("Invalid credentials.");
        }

        var token =
            _jwtTokenGenerator.GenerateToken(user);

        return new LoginResponse
        {
            AccessToken = token,

            User = new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role
            }
        };
    }
}