using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

using Core.Entities;
using Core.Interfaces.Services;
using Core.Settings;

using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services;

public class JwtService : ITokenService
{
    private readonly IOptions<JwtSettings> _jwtSettings;

    public JwtService(IOptions<JwtSettings> settings)
    {
        _jwtSettings = settings;
    }

    public AccessToken GetGeneratedAccessToken(User user)
    {
        JwtSecurityTokenHandler tokenHandler = new();
        var key = Encoding.UTF8.GetBytes(_jwtSettings.Value.Key!);

        ClaimsIdentity claimsIdentity = new(new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        });

        SigningCredentials signingCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);

        SecurityTokenDescriptor tokenDescriptor = new()
        {
            Subject = claimsIdentity,
            Issuer = _jwtSettings.Value.Issuer,
            Audience = _jwtSettings.Value.Audience,
            Expires = DateTime.Now.AddMinutes(_jwtSettings.Value.Expires),
            SigningCredentials = signingCredentials,
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return new AccessToken()
        {
            Token = tokenHandler.WriteToken(token)
        };

    }

    public RefreshToken GetGeneratedRefreshToken(string ipAddress)
    {
        var randomBytes = new byte[64];
        string token;
        
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomBytes);
            token = Convert.ToBase64String(randomBytes);
        }

        return new RefreshToken
        {
            Token = token,
            Expires = DateTime.UtcNow.AddDays(7),
            Created = DateTime.UtcNow,
            CreatedByIp = ipAddress
        };
    }
}