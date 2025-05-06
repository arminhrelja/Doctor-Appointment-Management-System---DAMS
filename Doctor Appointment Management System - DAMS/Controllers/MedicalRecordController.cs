using Doctor_Appointment_Management_System___DAMS.Models;
using Doctor_Appointment_Management_System___DAMS.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Doctor_Appointment_Management_System___DAMS.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MedicalRecordController : ControllerBase
{
    private readonly DamsContext _context;
    public MedicalRecordController(DamsContext context)
    {
        _context = context;
    }

    //Action for getting all medical records for patient
    [HttpGet("patient/{patientId}")]
    public async Task<IActionResult> GetRecordsForPatient(int patientId)
    {
        var records = await _context.MedicalRecords
            .Include(m => m.Doctor)
            .Include(m => m.Institution)
            .Where(m => m.PatientId == patientId)
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();
        return Ok(records.Select(MedicalRecordDTO.FromModel));
    }

    //Action for getting all medical records for doctor
    [HttpGet("doctor/{doctorId}/patient/{patientId}")]
    public async Task<IActionResult> GetRecordsForDoctorAndPatient(int doctorId, int patientId)
    {
        var records = await _context.MedicalRecords
            .Include(m => m.Patient)
            .Include(m => m.Institution)
            .Where(m => m.DoctorId == doctorId && m.PatientId == patientId)
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();
        return Ok(records.Select(MedicalRecordDTO.FromModel));
    }

    //Action for creating a new medical record
    [HttpPost]
    public async Task<IActionResult> CreateMedicalRecord([FromBody] CreateMedicalRecordDTO dto)
    {
        var record = new MedicalRecord
        {
            PatientId = dto.PatientId,
            DoctorId = dto.DoctorId,
            InstitutionId = dto.InstitutionId,
            Diagnosis = dto.Diagnosis,
            TreatmentPlan = dto.TreatmentPlan,
            CreatedAt = DateTime.UtcNow
        };
        _context.MedicalRecords.Add(record);
        await _context.SaveChangesAsync();
        return Ok(MedicalRecordDTO.FromModel(record));
    }

    //Action for updating a medical record
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMedicalRecord(int id, [FromBody] UpdateMedicalRecordDTO dto)
    {
        var record = await _context.MedicalRecords.FindAsync(id);
        if (record == null) return NotFound();
        record.Diagnosis = dto.Diagnosis;
        record.TreatmentPlan = dto.TreatmentPlan;
        await _context.SaveChangesAsync();
        return Ok(MedicalRecordDTO.FromModel(record));
    }
}