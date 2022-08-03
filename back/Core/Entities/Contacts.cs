using Core.Entities.Base;

namespace Core.Entities;

public class Contacts : Entity
{
    public string? Phone { get; set; }
    public string? Schedule { get; set; }
    public string? Location { get; set; }

    public ICollection<Social>? Socials = new List<Social>();

    public void Set(Contacts contacts)
    {
        Phone = contacts.Phone;
        Schedule = contacts.Schedule;
        Location = contacts.Location;
    }
}
