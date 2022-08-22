using Application.Responses.Base;

namespace Application.Responses;

public class ContactsResponse : Response
{
    public string Phone { get; set; } = string.Empty;
    public string Schedule { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Street { get; set; } = string.Empty;
}