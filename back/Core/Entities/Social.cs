using Core.Entities.Base;

namespace Core.Entities;

public class Social : Entity
{
    public string? Name { get; set; }
    public string? Site { get; set; }
    
    public Guid? ContactsId { get; set; }
    public Contacts? Contacts { get; set; }
}