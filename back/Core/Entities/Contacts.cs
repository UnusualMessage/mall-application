using Core.Entities.Base;

namespace Core.Entities;

public class Contacts : Entity, IUpdatable<Contacts>
{
    public string? Phone { get; set; }
    public string? Schedule { get; set; }
    public string? City { get; set; }
    public string? Street { get; set; }

    public void Update(Contacts contacts)
    {
        Phone = contacts.Phone;
        Schedule = contacts.Schedule;
        City = contacts.City;
        Street = contacts.Street;
    }
}
