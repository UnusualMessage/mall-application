using Core.Entities.Base;

namespace Core.Entities;

public class Contacts : Entity, IUpdatable<Contacts>
{
    public string? Phone { get; set; }
    public string? Schedule { get; set; }
    public string? Location { get; set; }

    public void Update(Contacts contacts)
    {
        Phone = contacts.Phone;
        Schedule = contacts.Schedule;
        Location = contacts.Location;
    }
}
