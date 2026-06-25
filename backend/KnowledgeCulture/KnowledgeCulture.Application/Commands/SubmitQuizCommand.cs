using MediatR;
using KnowledgeCulture.Application.DTOs;

namespace KnowledgeCulture.Application.Commands;

public record SubmitQuizCommand(
    Guid QuizId,
    Guid UserId,
    List<SubmitQuizAnswerDto> Answers)
    : IRequest<QuizResultDto>;