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

        [HttpPost("register")]
        public IActionResult Register([FromBody] Models.DTOs.RegisterDTO dto)
        {
            try
            {
                if (_context.Users.Any(u => u.Email == dto.Email))
                    return BadRequest(new { message = "Email is already in use." });

                if (string.IsNullOrWhiteSpace(dto.FirstName) ||
                    string.IsNullOrWhiteSpace(dto.LastName) ||
                    string.IsNullOrWhiteSpace(dto.Email) ||
                    string.IsNullOrWhiteSpace(dto.Password))
                    return BadRequest(new { message = "All required fields must be filled." });

                // Find default role (Patient)
                var defaultRole = _context.UserRoles.FirstOrDefault(r => r.RoleName == "Pacijent" || r.RoleName == "Patient");
                if (defaultRole == null)
                    return StatusCode(500, new { message = "Default role 'Pacijent'/'Patient' not found in UserRole table." });

                var user = new User
                {
                    FirstName = dto.FirstName,
                    LastName = dto.LastName,
                    Email = dto.Email,
                    Password = dto.Password,
                    PhoneNumber = string.IsNullOrWhiteSpace(dto.PhoneNumber) ? null : dto.PhoneNumber,
                    DateOfBirth = dto.DateOfBirth,
                    PrimaryRoleId = defaultRole.RoleId,
                    CreatedAt = DateTime.UtcNow
                };
                _context.Users.Add(user);
                _context.SaveChanges();

                // Add mapping for primary role (Patient)
                var mapping = new UserRoleMapping { UserId = user.UserId, RoleId = defaultRole.RoleId };
                _context.UserRoleMappings.Add(mapping);
                _context.SaveChanges();

                return Ok(new { message = "Registration successful. Please log in." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Registration failed.", error = ex.Message, stack = ex.StackTrace });
            }
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

            if (user.PrimaryRoleId == null)
            {
                return Unauthorized(new { message = "User does not have a primary role assigned. Please contact administrator." });
            }

            // Get primary role
            var role = _context.UserRoles.FirstOrDefault(r => r.RoleId == user.PrimaryRoleId);

            if (role == null)
            {
                return Unauthorized(new { message = "Invalid role" });
            }

            var token = GenerateJwtToken(user, role.RoleName);

            return Ok(new { Token = token, Role = role.RoleName, UserId = user.UserId });
        }

        private string GenerateJwtToken(User user, string role)
        {
            var jwtKey = _configuration["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new InvalidOperationException("JWT key is not configured.");
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, role),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString())
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
