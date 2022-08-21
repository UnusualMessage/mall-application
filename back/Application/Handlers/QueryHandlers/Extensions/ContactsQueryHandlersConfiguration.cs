using Application.Handlers.QueryHandlers.ContactsHandlers;
using MediatR;

using Microsoft.Extensions.DependencyInjection;
using Application.Requests.Queries.Contacts;
using Application.Responses;

namespace Application.Handlers.QueryHandlers.Extensions;

public static class ContactsQueryHandlersConfiguration
{
    public static void AddContactsQueryHandlers(this IServiceCollection services)
    {
        services
            .AddScoped<IRequestHandler<GetContacts, ContactsResponse>, GetContactsHandler>();
    }
}