using Sieve.Models;
using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Application.Requests.Commands.Discount;
using Application.Requests.Queries;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DiscountsController : ControllerBase
{
    private readonly IMediator _mediator;

    public DiscountsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] SieveModel model)
    {
        return Ok(await _mediator.Send(new GetSievedDiscounts(model)));
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromForm] CreateDiscount request)
    {
        return Ok(await _mediator.Send(request));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        return Ok(await _mediator.Send(new DeleteDiscount(id)));
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromForm] UpdateDiscount request)
    {
        return Ok(await _mediator.Send(request));
    }
}