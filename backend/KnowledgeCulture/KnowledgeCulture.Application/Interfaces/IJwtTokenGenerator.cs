using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Interfaces;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}