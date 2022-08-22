using Application.Responses.Base;

namespace Application.Responses;

public class CategoryResponse : Response
{
    public string Title { get; set; } = string.Empty;
}