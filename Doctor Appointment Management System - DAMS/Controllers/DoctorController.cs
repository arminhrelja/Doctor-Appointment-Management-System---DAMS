﻿using Doctor_Appointment_Management_System___DAMS.DTOs;
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

        //Action for adding a doctor
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
                CreatedAt = DateTime.UtcNow,
                PrimaryRoleId = 2
            };

            _context.Users.Add(doctor);
            _context.SaveChanges();

            // Add UserRoleMapping for Doctor role
            var doctorRole = _context.UserRoles.FirstOrDefault(r => r.RoleName == "Doctor" || r.RoleName == "Doktor");
            if (doctorRole != null)
            {
                _context.UserRoleMappings.Add(new UserRoleMapping { UserId = doctor.UserId, RoleId = doctorRole.RoleId });
            }
            // Always add UserRoleMapping for Patient role
            var patientRole = _context.UserRoles.FirstOrDefault(r => r.RoleName == "Patient" || r.RoleName == "Pacijent");
            if (patientRole != null && !_context.UserRoleMappings.Any(m => m.UserId == doctor.UserId && m.RoleId == patientRole.RoleId))
            {
                _context.UserRoleMappings.Add(new UserRoleMapping { UserId = doctor.UserId, RoleId = patientRole.RoleId });
            }
            _context.SaveChanges();

            //Add a link to UserInstitution (UserId, DepartmentId)
            var userInstitution = new UserInstitution
            {
                UserId = doctor.UserId,
                DepartmentId = dto.DepartmentId
            };
            _context.UserInstitutions.Add(userInstitution);
            _context.SaveChanges();

            return Ok(new { message = "Doctor added successfully." });
        }

        //Action for getting all doctors
        [HttpGet("list")]
        public ActionResult<IEnumerable<object>> GetAllDoctors()
        {
            try
            {
                var doctors = _context.Users
                    .Where(u => u.RoleId == 2)
                    .Select(u => new {
                        UserId = u.UserId,
                        FirstName = u.FirstName,
                        LastName = u.LastName,
                        Speciality = u.Speciality ?? "Unknown",
                        About = u.About ?? "No description available.",
                        Experience = u.Experience ?? 0,
                        Fee = u.Fee ?? 0,
                        InstitutionName = _context.UserInstitutions
                            .Where(ui => ui.UserId == u.UserId)
                            .Select(ui => ui.Department.Institution.Name)
                            .FirstOrDefault() ?? "Unknown"
                    })
                    .ToList();

                return Ok(doctors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Server error", error = ex.Message });
            }
        }

        //Action for getting a doctor by userId
        [HttpGet("{userId}")]
        public IActionResult GetDoctor(int userId)
        {
            var doctor = _context.Users.FirstOrDefault(d => d.UserId == userId && d.RoleId == 2);

            if (doctor == null)
            {
                return NotFound(new { message = "Doctor not found for the given user ID" });
            }

            var institutionName = _context.UserInstitutions
                .Where(ui => ui.UserId == doctor.UserId)
                .Select(ui => ui.Department.Institution.Name)
                .FirstOrDefault() ?? "Unknown";

            var dto = new {
                UserId = doctor.UserId,
                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                Speciality = doctor.Speciality ?? "Unknown",
                About = doctor.About ?? "No description available.",
                Experience = doctor.Experience ?? 0,
                Fee = doctor.Fee ?? 0,
                InstitutionName = institutionName
            };

            return Ok(dto);
        }

        //Action for getting a doctor by departmentId
        [HttpGet("specialty/{specialty}")]
        public ActionResult<IEnumerable<DoctorDto>> GetDoctorsBySpecialty(string specialty)
        {
            var doctors = _context.Users
                .Where(u => u.RoleId == 2 && u.Speciality != null && u.Speciality.ToLower() == specialty.ToLower())
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

        //Action for updating a doctors profile
        [HttpPut("update/{id}")]
        public IActionResult UpdateDoctor(int id, [FromBody] UpdateDoctorDTO dto)
        {
            var doctor = _context.Users.FirstOrDefault(u => u.UserId == id && u.RoleId == 2);
            if (doctor == null)
                return NotFound("Doctor not found.");

            doctor.FirstName = dto.FirstName;
            doctor.LastName = dto.LastName;
            doctor.Speciality = dto.Speciality;
            doctor.Experience = dto.Experience;
            doctor.Fee = dto.Fee;
            doctor.About = dto.About;

            _context.SaveChanges();
            return Ok(new
            {
                message = "Doctor updated successfully.",
                updatedDoctor = new DoctorDto
                {
                    UserId = doctor.UserId,
                    FirstName = doctor.FirstName,
                    LastName = doctor.LastName,
                    Speciality = doctor.Speciality ?? "Unknown",
                    About = doctor.About ?? "No description available.",
                    Experience = doctor.Experience ?? 0,
                    Fee = doctor.Fee ?? 0
                }
            });
        }
    }
}




















