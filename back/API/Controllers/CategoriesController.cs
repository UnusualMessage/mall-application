using Sieve.Models;
using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Application.Requests.Commands.Category;
using Application.Requests.Queries.Category;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    private readonly IMediator _mediator;

    public CategoriesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] SieveModel model)
    {
        return Ok(await _mediator.Send(new GetSievedCategories(model)));
    }
    
    [AllowAnonymous]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> Get([FromRoute] Guid id)
    {
        var response = await _mediator.Send(new GetCategoryById(id));

        if (response is null)
        {
            return NotFound("Категория не найдена!");
        }
        
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateCategory request)
    {
        var response = await _mediator.Send(request);

        if (response is null)
        {
            return BadRequest("Не удалось добавить категорию!");
        }
        
        return Ok(await _mediator.Send(request));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        var response = await _mediator.Send(new DeleteCategory(id));

        if (response is null)
        {
            return NotFound("Не удалось удалить категорию!");
        }
        
        return Ok(await _mediator.Send(new DeleteCategory(id)));
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] UpdateCategory request)
    {
        return Ok(await _mediator.Send(request));
    }
}