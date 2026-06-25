using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Infrastructure.Persistence;
using KnowledgeCulture.Infrastructure.Repositories;
using KnowledgeCulture.Infrastructure.Security;
using KnowledgeCulture.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace KnowledgeCulture.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection"));
        });

        services.Configure<JwtSettings>(
            configuration.GetSection("Jwt"));

        // ===========================
        // Security Services
        // ===========================

        services.AddScoped<IPasswordHasher, PasswordHasher>();

        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

        // ===========================
        // Business Services
        // ===========================

        services.AddScoped<IContinueLearningService,
            ContinueLearningService>();

        // ===========================
        // Repositories
        // ===========================

        services.AddScoped<IUserRepository,
            UserRepository>();

        services.AddScoped<ICourseRepository,
            CourseRepository>();

        services.AddScoped<IModuleRepository,
            ModuleRepository>();

        services.AddScoped<ILessonRepository,
            LessonRepository>();

        services.AddScoped<IQuizRepository,
            QuizRepository>();

        services.AddScoped<IEnrollmentRepository,
            EnrollmentRepository>();

        services.AddScoped<ILessonProgressRepository,
            LessonProgressRepository>();

        services.AddScoped<ICertificateRepository,
            CertificateRepository>();

        services.AddScoped<IMyCoursesService,
            MyCoursesService>();

        return services;
    }
}