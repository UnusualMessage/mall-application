using Core.Entities.Base;

namespace Core.Entities;

public class RefreshToken : Entity, IUpdatable<RefreshToken>
{
    public string Token { get; set; } = string.Empty;
    public DateTime Expires { get; set; }
    public bool IsExpired => DateTime.UtcNow >= Expires;
    public DateTime Created { get; set; }
    public string? CreatedByIp { get; set; }
    public DateTime? Revoked { get; set; }
    public string? RevokedByIp { get; set; }
    public string? ReplacedByToken { get; set; }
    public bool IsActive => Revoked == null && !IsExpired;

    public Guid UserId { get; set; }
    public User User { get; set; } = new();

    public void Update(RefreshToken token)
    {
        Token = token.Token;
        Expires = token.Expires;
        Created = token.Created;
        CreatedByIp = token.CreatedByIp;
        Revoked = token.Revoked;
        RevokedByIp = token.RevokedByIp;
        ReplacedByToken = token.ReplacedByToken;
    }
}
