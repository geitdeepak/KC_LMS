using MediatR;
using KnowledgeCulture.Application.DTOs;
using KnowledgeCulture.Application.Interfaces;
using KnowledgeCulture.Domain.Entities;

namespace KnowledgeCulture.Application.Commands;

public class CreateModuleCommandHandler
    : IRequestHandler<CreateModuleCommand, ModuleDto>
{
    private readonly IModuleRepository _moduleRepository;

    public CreateModuleCommandHandler(
        IModuleRepository moduleRepository)
    {
        _moduleRepository = moduleRepository;
    }

    public async Task<ModuleDto> Handle(
        CreateModuleCommand request,
        CancellationToken cancellationToken)
    {
        var module = new Module
        {
            Id = Guid.NewGuid(),
            CourseId = request.CourseId,
            Title = request.Title,
            Description = request.Description,
            Order = request.Order
        };

        await _moduleRepository.AddAsync(module);

        await _moduleRepository.SaveChangesAsync();

        return new ModuleDto
        {
            Id = module.Id,
            CourseId = module.CourseId,
            Title = module.Title,
            Description = module.Description,
            Order = module.Order
        };
    }
}