using MediatR;

using Microsoft.Extensions.DependencyInjection;

using Application.Handlers.CommandHandlers.ContactsHandlers;
using Application.Requests.Commands.Contacts;
using Application.Responses;

namespace Application.Handlers.CommandHandlers.Extensions;

public static class ContactsCommandHandlersConfiguration
{
    public static void AddContactsCommandHandlers(this IServiceCollection services)
    {
        services.AddScoped<IRequestHandler<UpdateContacts, ContactsResponse>, UpdateContactsHandler>();
    }
}