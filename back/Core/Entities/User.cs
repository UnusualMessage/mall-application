using Core.Entities.Base;

namespace Core.Entities;

public class User : Entity<User>
{
    public string Login { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    public override void Update(User user)
    {
        Login = user.Login;
        Password = user.Password;
    }
}
