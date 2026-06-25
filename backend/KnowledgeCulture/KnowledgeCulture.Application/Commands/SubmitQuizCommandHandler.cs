using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Commands;

public class SubmitQuizCommandHandler
    : IRequestHandler<
        SubmitQuizCommand,
        QuizResultDto>
{
    private readonly IQuizRepository
        _quizRepository;

    private readonly ILessonProgressRepository
        _lessonProgressRepository;

    public SubmitQuizCommandHandler(
        IQuizRepository quizRepository,
        ILessonProgressRepository lessonProgressRepository)
    {
        _quizRepository =
            quizRepository;

        _lessonProgressRepository =
            lessonProgressRepository;
    }

    public async Task<QuizResultDto> Handle(
        SubmitQuizCommand request,
        CancellationToken cancellationToken)
    {
        var quiz =
            await _quizRepository
                .GetByIdAsync(
                    request.QuizId);

        if (quiz == null)
        {
            throw new Exception(
                "Quiz not found.");
        }

        int score = 0;
        int totalMarks = 0;

        var attempt = new QuizAttempt
        {
            Id = Guid.NewGuid(),
            QuizId = request.QuizId,
            UserId = request.UserId
        };

        await _quizRepository
            .AddAttemptAsync(
                attempt);

        foreach (var question
                 in quiz.Questions)
        {
            totalMarks +=
                question.Marks;

            var submittedAnswer =
                request.Answers
                    .FirstOrDefault(
                        x =>
                            x.QuestionId ==
                            question.Id);

            bool isCorrect =
                submittedAnswer != null &&
                submittedAnswer
                    .SelectedAnswer
                    .Equals(
                        question.CorrectAnswer,
                        StringComparison
                            .OrdinalIgnoreCase);

            if (isCorrect)
            {
                score +=
                    question.Marks;
            }

            var answer =
                new QuizAnswer
                {
                    Id =
                        Guid.NewGuid(),

                    QuizAttemptId =
                        attempt.Id,

                    QuestionId =
                        question.Id,

                    SelectedAnswer =
                        submittedAnswer
                            ?.SelectedAnswer
                        ?? string.Empty,

                    IsCorrect =
                        isCorrect
                };

            await _quizRepository
                .AddAnswerAsync(
                    answer);
        }

        attempt.Score =
            score;

        attempt.TotalMarks =
            totalMarks;

        var percentage =
            totalMarks > 0
                ? ((decimal)score /
                   totalMarks) * 100
                : 0;

        attempt.IsPassed =
            percentage >=
            quiz.PassingScore;

        // Auto Complete Lesson
        if (attempt.IsPassed)
        {
            var lessonProgress =
                await _lessonProgressRepository
                    .GetByUserAndLessonAsync(
                        request.UserId,
                        quiz.LessonId);

            if (lessonProgress == null)
            {
                lessonProgress =
                    new LessonProgress
                    {
                        Id =
                            Guid.NewGuid(),

                        UserId =
                            request.UserId,

                        LessonId =
                            quiz.LessonId,

                        IsCompleted =
                            true,

                        CompletedAt =
                            DateTime.UtcNow
                    };

                await _lessonProgressRepository
                    .AddAsync(
                        lessonProgress);
            }
            else
            {
                lessonProgress
                    .IsCompleted =
                        true;

                lessonProgress
                    .CompletedAt =
                        DateTime.UtcNow;
            }
        }

        await _quizRepository
            .SaveChangesAsync();

        await _lessonProgressRepository
            .SaveChangesAsync();

        return new QuizResultDto
        {
            Score =
                score,

            TotalMarks =
                totalMarks,

            IsPassed =
                attempt.IsPassed
        };
    }
}