using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Doctor_Appointment_Management_System___DAMS.Models;
using System.Linq;
using System.Security.Claims;

namespace Doctor_Appointment_Management_System___DAMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly DamsContext _context;
        public RoleController(DamsContext context)
        {
            _context = context;
        }

        [HttpGet("available-roles")]
        [Authorize]
        public IActionResult GetAvailableRoles()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized("User not authenticated.");
            var userId = int.Parse(userIdClaim);
            var roles = _context.UserRoleMappings
                .Where(m => m.UserId == userId)
                .Select(m => m.Role.RoleName)
                .ToList();
            return Ok(roles);
        }

        [HttpPost("switch-role")]
        [Authorize]
        public IActionResult SwitchRole([FromBody] string roleName)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized("User not authenticated.");
            var userId = int.Parse(userIdClaim);
            var role = _context.UserRoles.FirstOrDefault(r => r.RoleName == roleName);
            if (role == null)
                return BadRequest("Role not found.");
            var mapping = _context.UserRoleMappings.FirstOrDefault(m => m.UserId == userId && m.RoleId == role.RoleId);
            if (mapping == null)
                return BadRequest("User does not have this role.");
            var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
            if (user == null)
                return BadRequest("User not found.");
            user.PrimaryRoleId = role.RoleId;
            _context.SaveChanges();
            return Ok(new { message = "Role switched successfully." });
        }

        [HttpPost("fix-user-roles")]
        [Authorize]
        public IActionResult FixUserRoles()
        {
            // Samo admin može pozvati
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized("User not authenticated.");
            var userId = int.Parse(userIdClaim);
            var adminUser = _context.Users.FirstOrDefault(u => u.UserId == userId);
            if (adminUser == null || adminUser.PrimaryRoleId == null)
                return Forbid("Only admin can use this endpoint.");
            var adminRole = _context.UserRoles.FirstOrDefault(r => r.RoleId == adminUser.PrimaryRoleId && (r.RoleName == "Admin" || r.RoleName == "Administrator"));
            if (adminRole == null)
                return Forbid("Only admin can use this endpoint.");

            var allUsers = _context.Users.ToList();
            var defaultRole = _context.UserRoles.FirstOrDefault(r => r.RoleName == "Pacijent" || r.RoleName == "Patient");
            if (defaultRole == null)
                return StatusCode(500, "Default role not found.");
            int fixedCount = 0;
            foreach (var user in allUsers)
            {
                if (user.PrimaryRoleId == null)
                {
                    user.PrimaryRoleId = user.RoleId > 0 ? user.RoleId : defaultRole.RoleId;
                    fixedCount++;
                }
                // Provjeri UserRoleMapping
                bool hasMapping = _context.UserRoleMappings.Any(m => m.UserId == user.UserId && m.RoleId == user.PrimaryRoleId);
                if (!hasMapping)
                {
                    _context.UserRoleMappings.Add(new UserRoleMapping { UserId = user.UserId, RoleId = user.PrimaryRoleId.Value });
                    fixedCount++;
                }
            }
            _context.SaveChanges();
            return Ok(new { message = $"Fixed {fixedCount} user roles/mappings." });
        }
    }
}
