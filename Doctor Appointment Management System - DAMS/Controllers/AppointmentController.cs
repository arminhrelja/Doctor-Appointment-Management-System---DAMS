using Microsoft.AspNetCore.Mvc;
using Doctor_Appointment_Management_System___DAMS.Models;
using Doctor_Appointment_Management_System___DAMS.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

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

        //Action for booking an appointment
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

        //Action for cancelling an appointment
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

        //Action for updating appointment status
        [HttpPut("update-status/{id}")]
        public IActionResult UpdateAppointmentStatus(int id, [FromBody] JsonElement body)
        {
            var appointment = _context.Appointments.FirstOrDefault(a => a.AppointmentId == id);
            if (appointment == null)
                return NotFound("Appointment not found.");

            if (!body.TryGetProperty("status", out var statusProp))
                return BadRequest("Status is required.");

            string status = statusProp.GetString();
            if (string.IsNullOrWhiteSpace(status))
                return BadRequest("Status is required.");

            appointment.Status = status;
            _context.SaveChanges();
            return Ok(new { message = "Appointment status updated successfully." });
        }

        //Action for getting all appointments
        [HttpGet("list")]
        public IActionResult GetAppointments()
        {
            var appointments = _context.Appointments
                .Include(a => a.Doctor)
                .Include(a => a.Patient)
                .ToList()
                .Select(a => new {
                    a.AppointmentId,
                    a.PatientId,
                    a.DoctorId,
                    a.InstitutionId,
                    a.AppointmentDate,
                    a.Status,
                    a.Notes,
                    Doctor = new {
                        UserId = a.Doctor?.UserId ?? 0,
                        FirstName = a.Doctor?.FirstName ?? "",
                        LastName = a.Doctor?.LastName ?? "",
                        Speciality = a.Doctor?.Speciality ?? "",
                        Email = a.Doctor?.Email ?? ""
                    },
                    Patient = new {
                        UserId = a.Patient?.UserId ?? 0,
                        FirstName = a.Patient?.FirstName ?? "",
                        LastName = a.Patient?.LastName ?? "",
                        Email = a.Patient?.Email ?? ""
                    }
                })
                .ToList();
            return Ok(appointments);
        }
    }
}