﻿using Core.Entities.Base;

namespace Core.Entities;

public class Contacts : Entity<Contacts>
{
    public string Phone { get; set; } = string.Empty;
    public string Schedule { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Street { get; set; } = string.Empty;

    public override void Update(Contacts contacts)
    {
        Phone = contacts.Phone;
        Schedule = contacts.Schedule;
        City = contacts.City;
        Street = contacts.Street;
    }
}
