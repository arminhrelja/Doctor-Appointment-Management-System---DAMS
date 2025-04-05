using Doctor_Appointment_Management_System___DAMS.DTOs;
using Doctor_Appointment_Management_System___DAMS.Models;
using Doctor_Appointment_Management_System___DAMS.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Doctor_Appointment_Management_System___DAMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly DamsContext _context;

        public DoctorController(DamsContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        public IActionResult AddDoctor([FromBody] AddDoctorDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("Doctor data is null.");
            }

            var doctor = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Password = dto.Password,
                Speciality = dto.Speciality,
                Experience = dto.Experience,
                Fee = dto.Fee,
                About = dto.About,
                RoleId = 2,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(doctor);
            _context.SaveChanges();

            return Ok(new { message = "Doctor added successfully." });
        }

        [HttpGet("list")]
        public ActionResult<IEnumerable<DoctorDto>> GetAllDoctors()
        {
            var doctors = _context.Users
                .Where(u => u.RoleId == 2)
                .Select(u => new DoctorDto
                {
                    UserId = u.UserId,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Speciality = u.Speciality ?? "Unknown",
                    About = u.About ?? "No description available.",
                    Experience = u.Experience ?? 0,
                    Fee = u.Fee ?? 0
                })
                .ToList();

            return Ok(doctors);
        }


    }
}
