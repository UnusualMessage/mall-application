using Microsoft.Extensions.DependencyInjection;

using Application.Handlers.QueryHandlers.Extensions;
using Application.Handlers.CommandHandlers.Extensions;

namespace Application.Handlers.Extensions;

public static class ContactsHandlersConfiguration
{
    public static void AddContactsHandlers(this IServiceCollection services)
    {
        services.AddContactsQueryHandlers();
        services.AddContactsCommandHandlers();
    }
}