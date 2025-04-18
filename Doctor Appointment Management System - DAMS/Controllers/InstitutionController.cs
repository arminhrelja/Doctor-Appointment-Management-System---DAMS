using Microsoft.AspNetCore.Mvc;
using Doctor_Appointment_Management_System___DAMS.Models;
using Doctor_Appointment_Management_System___DAMS.Models.DTOs;
using System;
using System.Linq;

namespace Doctor_Appointment_Management_System___DAMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstitutionController : ControllerBase
    {
        private readonly DamsContext _context;
        public InstitutionController(DamsContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        public IActionResult AddInstitution([FromBody] AddInstitutionDTO dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrWhiteSpace(dto.Address) || dto.InstitutionTypeId == 0)
                return BadRequest("All required fields must be filled.");

            var institution = new HealthCareInstitution
            {
                Name = dto.Name,
                Address = dto.Address,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
                CreatedAt = DateTime.UtcNow,
                InstitutionTypeId = dto.InstitutionTypeId
            };
            _context.HealthCareInstitutions.Add(institution);
            _context.SaveChanges();
            return Ok(new { message = "Institution added successfully." });
        }

        [HttpGet("list")]
        public IActionResult GetInstitutions()
        {
            var institutions = _context.HealthCareInstitutions.Select(i => new {
                i.InstitutionId,
                i.Name,
                i.Address,
                i.PhoneNumber,
                i.Email,
                i.InstitutionTypeId
            }).ToList();
            return Ok(institutions);
        }

        [HttpGet("types")]
        public IActionResult GetInstitutionTypes()
        {
            var types = _context.InstitutionTypes.Select(t => new { t.InstitutionTypeId, t.TypeName }).ToList();
            return Ok(types);
        }

        [HttpGet("departments")]
        public IActionResult GetDepartments()
        {
            var departments = _context.Departments
                .Select(d => new {
                    d.DepartmentId,
                    d.DepartmentName,
                    d.Description,
                    Institution = new {
                        d.Institution.InstitutionId,
                        d.Institution.Name
                    }
                }).ToList();
            return Ok(departments);
        }
    }
}