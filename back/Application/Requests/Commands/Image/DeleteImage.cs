using Application.Responses;
using MediatR;

namespace Application.Requests.Commands.Image;

public class DeleteImage : IRequest<ImageResponse>
{
    public Guid Id { get; }
    public string? RootPath { get; set; }

    public DeleteImage(Guid id)
    {
        Id = id;
    }
}