using Core.Entities;
using Core.Interfaces.Repositories;

using Infrastructure.Context;
using Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ContactsRepository : Repository<Contacts>, IContactsRepository
{
    public ContactsRepository(ApplicationContext applicationContext) : base(applicationContext)
    {
    }
}