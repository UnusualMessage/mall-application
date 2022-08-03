using System.ComponentModel.DataAnnotations;

using Application.Responses;

using MediatR;

namespace Application.Requests.Commands.Contacts;

public class CreateContacts : IRequest<ContactsResponse>
{
    [Required]
    public string? Phone { get; set; }
    
    [Required]
    public string? Schedule { get; set; }
    
    [Required]
    public string? Location { get; set; }
}