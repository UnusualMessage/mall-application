using Application.Responses.Base;

namespace Application.Responses;

public class BreadcrumbResponse : Response
{
    public string Name { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;
}