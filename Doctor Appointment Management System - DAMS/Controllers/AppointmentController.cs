using Microsoft.AspNetCore.Mvc;
using Doctor_Appointment_Management_System___DAMS.Models;
using Doctor_Appointment_Management_System___DAMS.Models.DTOs;
using System.Linq;

namespace Doctor_Appointment_Management_System___DAMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly DamsContext _context;

        public AppointmentController(DamsContext context)
        {
            _context = context;
        }

        [HttpPost("book")]
        public IActionResult BookAppointment([FromBody] BookAppointmentDTO dto)
        {
            if (dto == null || dto.PatientId == 0 || dto.DoctorId == 0 || string.IsNullOrWhiteSpace(dto.AppointmentDate))
            {
                return BadRequest("Invalid appointment data.");
            }

            var appointment = new Appointment
            {
                PatientId = dto.PatientId,
                DoctorId = dto.DoctorId,
                AppointmentDate = DateTime.Parse(dto.AppointmentDate),
                Status = dto.Status ?? "Scheduled",
                InstitutionId = 1 // ili postavi prema logici tvoje aplikacije
            };

            _context.Appointments.Add(appointment);
            _context.SaveChanges();

            return Ok(new { message = "Appointment booked successfully." });
        }

        [HttpPut("cancel/{id}")]
        public IActionResult CancelAppointment(int id)
        {
            var appointment = _context.Appointments.FirstOrDefault(a => a.AppointmentId == id);

            if (appointment == null)
            {
                return NotFound("Appointment not found.");
            }

            appointment.Status = "Cancelled";
            _context.SaveChanges();

            return Ok(new { message = "Appointment cancelled successfully." });
        }

        [HttpGet("list")]
        public IActionResult GetAppointments()
        {
            var appointments = _context.Appointments.ToList();
            return Ok(appointments);
        }
    }
}