using KnowledgeCulture.Application.DTOs;
using MediatR;

namespace KnowledgeCulture.Application.Queries;

public class GetContinueLearningQuery
    : IRequest<ContinueLearningDto?>
{
    public Guid UserId { get; }

    public GetContinueLearningQuery(
        Guid userId)
    {
        UserId = userId;
    }
}