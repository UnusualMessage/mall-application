using Application.MappingProfiles;
using Application.Requests.Queries.Breadcrumb;
using Application.Responses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces.Repositories;
using MediatR;
using Sieve.Services;

namespace Application.Handlers.QueryHandlers.BreadcrumbHandlers;

public class GetSievedBreadcrumbsHandler : IRequestHandler<GetSievedBreadcrumbs, IEnumerable<BreadcrumbResponse>>
{
    private readonly IBreadcrumbRepository _breadcrumbsRepository;
    private readonly ISieveProcessor _processor;

    public GetSievedBreadcrumbsHandler(IBreadcrumbRepository repository, ISieveProcessor processor)
    {
        _breadcrumbsRepository = repository;
        _processor = processor;
    }
    
    public async Task<IEnumerable<BreadcrumbResponse>> Handle(GetSievedBreadcrumbs request, CancellationToken cancellationToken)
    {
        var result = await _breadcrumbsRepository.GetAllAsync();

        MapperConfiguration configuration = new(cfg =>
        {
            cfg.AddProfile(new BreadcrumbProfile());
        });

        
        var response = result.AsQueryable().ProjectTo<BreadcrumbResponse>(configuration);

        return _processor.Apply(request.SieveModel, response).AsEnumerable();
    }
}