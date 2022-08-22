using System.ComponentModel.DataAnnotations;

using Application.Responses;

using MediatR;

namespace Application.Requests.Commands.Contacts;

public class UpdateContacts : IRequest<ContactsResponse>
{
    [Required]
    public Guid Id { get; set; }

    public string Phone { get; set; } = string.Empty;
    public string Schedule { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Street { get; set; } = string.Empty;
}