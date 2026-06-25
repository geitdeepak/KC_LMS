using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;
using KnowledgeCulture.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeCulture.Infrastructure.Repositories;

public class QuizRepository : IQuizRepository
{
    private readonly ApplicationDbContext _context;

    public QuizRepository(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Quiz quiz)
    {
        await _context.Quizzes.AddAsync(quiz);
    }

    public async Task<Quiz?> GetByIdAsync(Guid id)
    {
        return await _context.Quizzes
            .Include(x => x.Questions)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<List<Quiz>> GetByLessonIdAsync(Guid lessonId)
    {
        return await _context.Quizzes
            .Where(x => x.LessonId == lessonId)
            .ToListAsync();
    }

    public async Task<List<Quiz>> GetAllAsync()
    {
        return await _context.Quizzes
            .ToListAsync();
    }

    public async Task AddAttemptAsync(
        QuizAttempt attempt)
    {
        await _context.QuizAttempts
            .AddAsync(attempt);
    }

    public async Task AddAnswerAsync(
        QuizAnswer answer)
    {
        await _context.QuizAnswers
            .AddAsync(answer);
    }

    public async Task<List<QuizQuestion>>
    GetQuestionsByQuizIdAsync(
        Guid quizId)
    {
        return await _context.QuizQuestions
            .Where(x => x.QuizId == quizId)
            .ToListAsync();
    }

    public async Task AddQuestionAsync(
    QuizQuestion question)
    {
        await _context.QuizQuestions
            .AddAsync(question);
    }

    public async Task<bool> HasPassedQuizAsync(
    Guid userId,
    Guid quizId)
    {
        return await _context.QuizAttempts
            .AnyAsync(x =>
                x.UserId == userId &&
                x.QuizId == quizId &&
                x.IsPassed);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}