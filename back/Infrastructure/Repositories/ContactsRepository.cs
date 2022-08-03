﻿using Core.Entities;
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

    public override async Task<Contacts> UpdateAsync(Contacts entity)
    {
        var selected = await ApplicationContext.Set<Contacts>().FirstOrDefaultAsync(e => e.Id == entity.Id);

        selected?.Set(entity);

        await ApplicationContext.SaveChangesAsync();

        return await GetByIdAsync(entity.Id);
    }
}