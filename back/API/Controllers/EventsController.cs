﻿using Sieve.Models;
using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Application.Requests.Commands.Event;
using Application.Requests.Queries.Event;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EventsController : ControllerBase
{
    private readonly IMediator _mediator;

    public EventsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] SieveModel model)
    {
        return Ok(await _mediator.Send(new GetSievedEvents(model)));
    }
    
    [AllowAnonymous]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> Get([FromRoute] Guid id)
    {
        try
        {
            var response = await _mediator.Send(new GetEventById(id));
            return Ok(response);
        }
        catch (NullReferenceException)
        {
            return NotFound("Статья не найдена!");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateEvent request)
    {
        var response = await _mediator.Send(request);

        if (response is null)
        {
            return BadRequest("Не удалось создать категорию");
        }
        
        return Ok(await _mediator.Send(request));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        return Ok(await _mediator.Send(new DeleteEvent(id)));
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] UpdateEvent request)
    {
        return Ok(await _mediator.Send(request));
    }
}