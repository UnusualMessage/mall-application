﻿using System.Net;
using Application.Responses.Base;
using Core.Exceptions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace API.Middlewares;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    
    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    
    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (NotFoundException notFoundException)
        {
            await HandleExceptionAsync(httpContext, notFoundException);
        }
        catch (BadRequestException badRequestException)
        {
            await HandleExceptionAsync(httpContext, badRequestException);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(httpContext, ex);
        }
    }
    
    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json; charset=utf-8";

        context.Response.StatusCode = exception switch
        {
            NotFoundException => (int)HttpStatusCode.NotFound,
            BadRequestException => (int)HttpStatusCode.BadRequest,
            _ => (int)HttpStatusCode.InternalServerError
        };
        
        var response = new ErrorResponse(exception.Message);  
        await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),     	
            Formatting = Formatting.Indented
        }));
    }
}