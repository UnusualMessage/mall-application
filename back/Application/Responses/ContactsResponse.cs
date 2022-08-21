using Application.Responses.Base;

namespace Application.Responses;

public class ContactsResponse : Response
{
    public string? Phone { get; set; }
    public string? Schedule { get; set; }
    public string? City { get; set; }
    public string? Street { get; set; }
}