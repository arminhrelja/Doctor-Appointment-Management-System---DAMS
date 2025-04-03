using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Doctor_Appointment_Management_System___DAMS.Models;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Doctor_Appointment_Management_System___DAMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DamsContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(DamsContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Models.LoginRequest loginRequest)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == loginRequest.Email && u.Password == loginRequest.Password);
            
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            var role = _context.UserRoles.FirstOrDefault(r => r.RoleId == user.RoleId);

            if (role == null)
            {
                return Unauthorized(new { message = "Invalid role" });
            }

            var token = GenerateJwtToken(user, role.RoleName);
            return Ok(new { Token = token, Role = role.RoleName });

        }

        private string GenerateJwtToken(User user, string role)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.Role, role)
        };
            var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds
        );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
