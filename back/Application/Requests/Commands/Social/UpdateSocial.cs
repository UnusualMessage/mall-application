namespace Application.Requests.Commands.Social;

public class UpdateSocial
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Site { get; set; } = string.Empty;
}