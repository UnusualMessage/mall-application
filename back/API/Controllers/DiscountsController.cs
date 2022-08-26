using Sieve.Models;
using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Application.Requests.Commands.Discount;
using Application.Requests.Queries.Discount;

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
    
    [AllowAnonymous]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> Get([FromRoute] Guid id)
    {
        try
        {
            var response = await _mediator.Send(new GetDiscountById(id));
            return Ok(response);
        }
        catch (NullReferenceException)
        {
            return NotFound("Статья не найдена!");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateDiscount request)
    {
        try
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }
        catch (NullReferenceException)
        {
            return BadRequest("Не удалось создать статью!");
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        try
        {
            var response = await _mediator.Send(new DeleteDiscount(id));
            return Ok(response);
        }
        catch (NullReferenceException)
        {
            return NotFound("Не найдена статья для удаления!");
        }
        catch (InvalidOperationException)
        {
            return BadRequest("Не удалось удалить статью!");
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] UpdateDiscount request)
    {
        var response = await _mediator.Send(request);

        if (response is null)
        {
            return BadRequest("Не удалось обновить статью!");
        }
        
        return Ok(response);
    }
}