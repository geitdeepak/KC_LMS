using KnowledgeCulture.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeCulture.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<Course> Courses => Set<Course>();

    public DbSet<Module> Modules => Set<Module>();

    public DbSet<Lesson> Lessons => Set<Lesson>();

    public DbSet<Quiz> Quizzes => Set<Quiz>();

    public DbSet<QuizQuestion> QuizQuestions => Set<QuizQuestion>();

    public DbSet<Enrollment> Enrollments => Set<Enrollment>();

    public DbSet<LessonProgress> LessonProgresses => Set<LessonProgress>();

    public DbSet<QuizAttempt> QuizAttempts => Set<QuizAttempt>();

    public DbSet<QuizAnswer> QuizAnswers => Set<QuizAnswer>();

    public DbSet<Certificate> Certificates => Set<Certificate>();

    protected override void OnModelCreating(
        ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ===========================
        // Course -> Module
        // ===========================

        modelBuilder.Entity<Module>()
            .HasOne(x => x.Course)
            .WithMany(x => x.Modules)
            .HasForeignKey(x => x.CourseId);

        // ===========================
        // Module -> Lesson
        // ===========================

        modelBuilder.Entity<Lesson>()
            .HasOne(x => x.Module)
            .WithMany(x => x.Lessons)
            .HasForeignKey(x => x.ModuleId);

        // ===========================
        // Lesson -> Quiz
        // ===========================

        modelBuilder.Entity<Quiz>()
            .HasOne(x => x.Lesson)
            .WithMany(x => x.Quizzes)
            .HasForeignKey(x => x.LessonId);

        // ===========================
        // Quiz -> Question
        // ===========================

        modelBuilder.Entity<QuizQuestion>()
            .HasOne(x => x.Quiz)
            .WithMany(x => x.Questions)
            .HasForeignKey(x => x.QuizId);

        // ===========================
        // Enrollment -> User
        // ===========================

        modelBuilder.Entity<Enrollment>()
            .HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // ===========================
        // Enrollment -> Course
        // ===========================

        modelBuilder.Entity<Enrollment>()
            .HasOne(x => x.Course)
            .WithMany(x => x.Enrollments)
            .HasForeignKey(x => x.CourseId)
            .OnDelete(DeleteBehavior.Cascade);

        // ===========================
        // Lesson Progress -> User
        // ===========================

        modelBuilder.Entity<LessonProgress>()
            .HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // ===========================
        // Lesson Progress -> Lesson
        // ===========================

        modelBuilder.Entity<LessonProgress>()
            .HasOne(x => x.Lesson)
            .WithMany(x => x.LessonProgresses)
            .HasForeignKey(x => x.LessonId)
            .OnDelete(DeleteBehavior.Cascade);

        // ===========================
        // Quiz Attempt
        // ===========================

        modelBuilder.Entity<QuizAttempt>()
            .HasOne(x => x.Quiz)
            .WithMany()
            .HasForeignKey(x => x.QuizId);

        // ===========================
        // Quiz Answer
        // ===========================

        modelBuilder.Entity<QuizAnswer>()
            .HasOne(x => x.QuizAttempt)
            .WithMany(x => x.Answers)
            .HasForeignKey(x => x.QuizAttemptId);

        modelBuilder.Entity<QuizAnswer>()
            .HasOne(x => x.Question)
            .WithMany()
            .HasForeignKey(x => x.QuestionId)
            .OnDelete(DeleteBehavior.Restrict);

        // ===========================
        // Certificate
        // ===========================

        modelBuilder.Entity<Certificate>()
            .HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId);

        modelBuilder.Entity<Certificate>()
            .HasOne(x => x.Course)
            .WithMany()
            .HasForeignKey(x => x.CourseId);
    }
}