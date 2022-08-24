using Core.Entities.Base;

namespace Core.Entities;

public class User : Entity
{
    public string Login { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    public void Set(User user)
    {
        Login = user.Login;
        Password = user.Password;
    }
}
