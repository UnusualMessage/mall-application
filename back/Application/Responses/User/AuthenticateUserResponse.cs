using System.Text.Json.Serialization;

using Application.Responses.Base;

namespace Application.Responses.User;

public class AuthenticateUserResponse
{
    public string? AccessToken { get; set; }
    public bool Successful { get; set; }

    [JsonIgnore]
    public string? RefreshToken { get; set; }
}