using System.Net;
using System.Text.Json;

namespace KnowledgeCulture.API.Middleware;

public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;

    private readonly IWebHostEnvironment _environment;

    public GlobalExceptionMiddleware(
        RequestDelegate next,
        IWebHostEnvironment environment)
    {
        _next = next;
        _environment = environment;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(
                context,
                ex,
                _environment);
        }
    }

    private static async Task HandleExceptionAsync(
        HttpContext context,
        Exception exception,
        IWebHostEnvironment environment)
    {
        context.Response.ContentType = "application/json";

        var response = new ErrorResponse
        {
            Success = false
        };

        switch (exception)
        {
            case UnauthorizedAccessException:

                context.Response.StatusCode =
                    (int)HttpStatusCode.Unauthorized;

                response.Message =
                    "Unauthorized access.";

                break;

            case KeyNotFoundException:

                context.Response.StatusCode =
                    (int)HttpStatusCode.NotFound;

                response.Message =
                    exception.Message;

                break;

            case ArgumentException:

                context.Response.StatusCode =
                    (int)HttpStatusCode.BadRequest;

                response.Message =
                    exception.Message;

                break;

            default:

                context.Response.StatusCode =
                    (int)HttpStatusCode.InternalServerError;

                response.Message =
                    environment.IsDevelopment()
                        ? exception.ToString()
                        : "An unexpected error occurred.";

                break;
        }

        var result =
            JsonSerializer.Serialize(
                response,
                new JsonSerializerOptions
                {
                    WriteIndented = true
                });

        await context.Response.WriteAsync(result);
    }
}

public class ErrorResponse
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;

    public List<string> Errors { get; set; } = [];
}