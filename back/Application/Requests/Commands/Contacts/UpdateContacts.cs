using System.ComponentModel.DataAnnotations;

using Application.Responses;

using MediatR;

namespace Application.Requests.Commands.Contacts;

public class UpdateContacts : IRequest<ContactsResponse>
{
    [Required]
    public Guid? Id { get; set; }
    
    public string? Phone { get; set; }
    public string? Schedule { get; set; }
    public string? City { get; set; }
    public string? Street { get; set; }
}