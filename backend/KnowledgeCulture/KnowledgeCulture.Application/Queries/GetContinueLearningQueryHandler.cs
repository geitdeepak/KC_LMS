using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;
using MediatR;

namespace KnowledgeCulture.Application.Queries;

public class GetContinueLearningQueryHandler
    : IRequestHandler<
        GetContinueLearningQuery,
        ContinueLearningDto?>
{
    private readonly IContinueLearningService
        _continueLearningService;

    public GetContinueLearningQueryHandler(
        IContinueLearningService continueLearningService)
    {
        _continueLearningService =
            continueLearningService;
    }

    public async Task<ContinueLearningDto?> Handle(
        GetContinueLearningQuery request,
        CancellationToken cancellationToken)
    {
        return await _continueLearningService
            .GetAsync(request.UserId);
    }
}