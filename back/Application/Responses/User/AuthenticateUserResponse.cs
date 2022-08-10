using System.Text.Json.Serialization;

using Application.Responses.Base;

namespace Application.Responses.User;

public class AuthenticateUserResponse : Response
{
    public string? Login { get; set; }
    public string? Password { get; set; }
    public string? AccessToken { get; set; }
    public bool Successful { get; set; }

    [JsonIgnore]
    public string? RefreshToken { get; set; }
}