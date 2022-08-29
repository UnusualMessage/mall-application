using System.Text.Json.Serialization;

namespace Application.Responses.User;

public class AuthenticateUserResponse
{
    public string? AccessToken { get; set; }

    [JsonIgnore]
    public string? RefreshToken { get; set; }
}