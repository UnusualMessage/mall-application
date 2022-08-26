﻿using Sieve.Models;
using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Application.Requests.Commands.Shop;
using Application.Requests.Queries.Shop;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ShopsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ShopsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] SieveModel model)
    {
        return Ok(await _mediator.Send(new GetSievedShops(model)));
    }
    
    [AllowAnonymous]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> Get([FromRoute] Guid id)
    {
        try
        {
            var response = await _mediator.Send(new GetShopById(id));
            return Ok(response);
        }
        catch (NullReferenceException)
        {
            return NotFound("Статья не найдена!");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateShop request)
    {
        return Ok(await _mediator.Send(request));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        return Ok(await _mediator.Send(new DeleteShop(id)));
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] UpdateShop request)
    {
        return Ok(await _mediator.Send(request));
    }
}