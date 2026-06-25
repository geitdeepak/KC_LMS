using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Interfaces;

public interface IQuizRepository
{
    Task AddAsync(Quiz quiz);

    Task<Quiz?> GetByIdAsync(Guid id);

    Task<List<Quiz>> GetByLessonIdAsync(Guid lessonId);

    Task<List<Quiz>> GetAllAsync();

    Task AddAttemptAsync(
        QuizAttempt attempt);

    Task AddAnswerAsync(
        QuizAnswer answer);

    Task AddQuestionAsync(
    QuizQuestion question);

    Task<List<QuizQuestion>> GetQuestionsByQuizIdAsync(
    Guid quizId);

    Task<bool> HasPassedQuizAsync(
    Guid userId,
    Guid quizId);

    Task SaveChangesAsync();
}