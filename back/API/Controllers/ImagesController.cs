using Application.Requests.Commands.Image;
using Application.Requests.Queries.Image;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ImagesController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public ImagesController(IMediator mediator, IWebHostEnvironment webHostEnvironment)
    {
        _mediator = mediator;
        _webHostEnvironment = webHostEnvironment;
    }
    
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] SieveModel model)
    {
        return Ok(await _mediator.Send(new GetSievedImages(model)));
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromForm] CreateImage request)
    {
        request.Destination = _webHostEnvironment.WebRootPath;
        
        return Ok(await _mediator.Send(request));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        var rootPath = _webHostEnvironment.WebRootPath;

        return Ok(await _mediator.Send(new DeleteImage(id)
        {
            RootPath = rootPath
        }));
    }
}