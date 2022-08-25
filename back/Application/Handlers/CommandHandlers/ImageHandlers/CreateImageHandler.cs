using Application.Requests.Commands.Image;
using Application.Responses;
using AutoMapper;
using Core.Entities;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using MediatR;

namespace Application.Handlers.CommandHandlers.ImageHandlers;

public class CreateImageHandler : IRequestHandler<CreateImage, ImageResponse>
{
    private readonly IImageRepository _imageRepository;
    private readonly IFileService _fileService;
    private readonly IMapper _mapper;

    public CreateImageHandler(IImageRepository repository, IFileService service, IMapper mapper)
    {
        _imageRepository = repository;
        _fileService = service;
        _mapper = mapper;
    }
    
    public async Task<ImageResponse> Handle(CreateImage request, CancellationToken cancellationToken)
    {
        var newImage = new Image()
        {
            Path = await _fileService.UploadFile(request.Image, request.Destination!)
        };

        return _mapper.Map<ImageResponse>(await _imageRepository.AddAsync(newImage));
    }
}