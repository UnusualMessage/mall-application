﻿using Application.Requests.Queries.Breadcrumb;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BreadcrumbsController : ControllerBase
{
    private readonly IMediator _mediator;

    public BreadcrumbsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] SieveModel model)
    {
        return Ok(await _mediator.Send(new GetSievedBreadcrumbs(model)));
    }
}