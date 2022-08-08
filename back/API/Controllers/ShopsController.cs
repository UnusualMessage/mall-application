using Sieve.Models;
using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Application.Requests.Commands.Shop;
using Application.Requests.Queries;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ShopsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public ShopsController(IMediator mediator, IWebHostEnvironment webHostEnvironment)
    {
        _mediator = mediator;
        _webHostEnvironment = webHostEnvironment;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] SieveModel model)
    {
        return Ok(await _mediator.Send(new GetSievedShops(model)));
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromForm] CreateShop request)
    {
        request.Destination = _webHostEnvironment.WebRootPath;
        
        return Ok(await _mediator.Send(request));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        return Ok(await _mediator.Send(new DeleteShop(id)));
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromForm] UpdateShop request)
    {
        request.Destination = _webHostEnvironment.WebRootPath;
        
        return Ok(await _mediator.Send(request));
    }
}