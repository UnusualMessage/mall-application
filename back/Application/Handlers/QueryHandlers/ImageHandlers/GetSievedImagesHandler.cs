using Application.MappingProfiles;
using Application.Requests.Queries.Image;
using Application.Responses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces.Repositories;
using MediatR;
using Sieve.Services;

namespace Application.Handlers.QueryHandlers.ImageHandlers;

public class GetSievedImagesHandler : IRequestHandler<GetSievedImages, IEnumerable<ImageResponse>>
{
    private readonly IImageRepository _imageRepository;
    private readonly ISieveProcessor _processor;

    public GetSievedImagesHandler(IImageRepository repository, ISieveProcessor processor)
    {
        _imageRepository = repository;
        _processor = processor;
    }
    
    public async Task<IEnumerable<ImageResponse>> Handle(GetSievedImages request, CancellationToken cancellationToken)
    {
        var result = await _imageRepository.GetAllAsync();

        MapperConfiguration configuration = new(cfg => {
            cfg.AddProfile(new ImageProfile());
        });

        var response = result.AsQueryable().ProjectTo<ImageResponse>(configuration);

        return _processor.Apply(request.SieveModel, response).AsEnumerable();
    }
}