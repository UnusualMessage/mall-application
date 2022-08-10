using MediatR;

using Microsoft.Extensions.DependencyInjection;

using Application.Requests.Queries;
using Application.Responses;

namespace Application.Handlers.QueryHandlers.Extensions;

public static class ContactsQueryHandlersConfiguration
{
    public static void AddContactsQueryHandlers(this IServiceCollection services)
    {
        services
            .AddScoped<IRequestHandler<GetSievedContacts, IEnumerable<ContactsResponse>>, GetSievedContactsHandler>();
    }
}