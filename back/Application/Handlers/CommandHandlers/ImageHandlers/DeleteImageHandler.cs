using Application.Requests.Commands.Image;
using Application.Responses;
using AutoMapper;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using MediatR;

namespace Application.Handlers.CommandHandlers.ImageHandlers;

public class DeleteImageHandler : IRequestHandler<DeleteImage, ImageResponse>
{
    private readonly IImageRepository _imageRepository;
    private readonly IFileService _fileService;
    private readonly IMapper _mapper;
    
    public DeleteImageHandler(IImageRepository repository, IFileService service, IMapper mapper)
    {
        _imageRepository = repository;
        _fileService = service;
        _mapper = mapper;
    }

    public async Task<ImageResponse> Handle(DeleteImage request, CancellationToken cancellationToken)
    {
        var deletedImage = await _imageRepository.DeleteByIdAsync(request.Id);

        if (deletedImage is not null)
        {
            _fileService.DeleteFile(request.RootPath!, deletedImage.Path);
        }

        return _mapper.Map<ImageResponse>(deletedImage);
    }
}