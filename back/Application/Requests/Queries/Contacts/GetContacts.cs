using Application.Requests.Queries.Base;
using Application.Responses;
using MediatR;
using Sieve.Models;

namespace Application.Requests.Queries.Contacts;

public class GetContacts : IRequest<ContactsResponse>
{
}