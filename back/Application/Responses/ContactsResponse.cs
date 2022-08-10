using Application.Responses.Base;

namespace Application.Responses;

public class ContactsResponse : Response
{
    public string? Phone { get; set; }
    public string? Schedule { get; set; }
    public string? Location { get; set; }
}