using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Application.Requests.Commands.Contacts;
using Application.Requests.Queries.Contacts;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ContactsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ContactsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _mediator.Send(new GetContacts()));
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] UpdateContacts request)
    {
        return Ok(await _mediator.Send(request));
    }
}