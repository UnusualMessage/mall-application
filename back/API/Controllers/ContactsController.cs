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
        try
        {
            var response = await _mediator.Send(new GetContacts());
            return Ok(response);
        }
        catch (NullReferenceException)
        {
            return NotFound("Информация по контактам не найдена!");
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] UpdateContacts request)
    {
        try
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }
        catch (NullReferenceException)
        {
            return NotFound("Не найдена информация для обновления!");
        }
        catch (InvalidOperationException)
        {
            return BadRequest("Не удалось обновить информацию! Повторите позже.");
        }
    }
}