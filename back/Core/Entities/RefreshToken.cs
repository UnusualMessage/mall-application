using Core.Entities.Base;

namespace Core.Entities;

public class RefreshToken : Entity, IUpdatable<RefreshToken>
{
    public string? Token { get; set; }
    public DateTime Expires { get; set; }
    public bool IsExpired => DateTime.UtcNow >= Expires;
    public DateTime Created { get; set; }
    public string? CreatedByIp { get; set; }
    public DateTime? Revoked { get; set; }
    public string? RevokedByIp { get; set; }
    public string? ReplacedByToken { get; set; }
    public bool IsActive => Revoked == null && !IsExpired;

    public User? User { get; set; }
    public Guid? UserId { get; set; }

    public void Update(RefreshToken token)
    {
        Token = token.Token;
        Expires = token.Expires;
        Created = token.Created;
        CreatedByIp = token.CreatedByIp;
        Revoked = token.Revoked;
        RevokedByIp = token.RevokedByIp;
        ReplacedByToken = token.ReplacedByToken;
        UserId = token.UserId;
    }
}
