using AutoMapper;
using MediatR;

using Application.Requests.Commands.Discount;
using Application.Responses;
using Core.Entities;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;

namespace Application.Handlers.CommandHandlers.DiscountHandlers;

public class UpdateDiscountHandler : IRequestHandler<UpdateDiscount, DiscountResponse>
{
    private readonly IDiscountRepository _discountRepository;
    private readonly IMapper _mapper;
    private readonly IFileService _fileService;

    public UpdateDiscountHandler(IDiscountRepository repository, IMapper mapper, IFileService fileService)
    {
        _discountRepository = repository;
        _mapper = mapper;
        _fileService = fileService;
    }
    
    public async Task<DiscountResponse> Handle(UpdateDiscount request, CancellationToken cancellationToken)
    {
        var discountToBeUpdated = await _discountRepository.GetByIdAsync(request.Id);
        discountToBeUpdated?.Route?.Update(new Route()
        {
            Path = request.RoutePath
        });
        
        discountToBeUpdated?.Breadcrumb?.Update(new Breadcrumb()
        {
            Name = request.Title,
            Link = request.Link
        });

        var newDiscount = _mapper.Map<Discount>(request);
        newDiscount.LogoPath = await _fileService.UploadFile(request.Image, request.Destination!);
        
        return _mapper.Map<DiscountResponse>(await _discountRepository.UpdateAsync(_mapper.Map<Discount>(request)));
    }
}