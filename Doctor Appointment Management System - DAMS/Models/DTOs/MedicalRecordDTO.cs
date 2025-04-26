namespace Doctor_Appointment_Management_System___DAMS.Models.DTOs;

public class MedicalRecordDTO
{
    public int MedicalRecordId { get; set; }
    public int PatientId { get; set; }
    public int DoctorId { get; set; }
    public int InstitutionId { get; set; }
    public string Diagnosis { get; set; } = null!;
    public string? TreatmentPlan { get; set; }
    public DateTime CreatedAt { get; set; }
    public string DoctorName { get; set; } = string.Empty;
    public string InstitutionName { get; set; } = string.Empty;
    public string PatientName { get; set; } = string.Empty;

    public static MedicalRecordDTO FromModel(MedicalRecord m)
    {
        return new MedicalRecordDTO
        {
            MedicalRecordId = m.MedicalRecordId,
            PatientId = m.PatientId,
            DoctorId = m.DoctorId,
            InstitutionId = m.InstitutionId,
            Diagnosis = m.Diagnosis,
            TreatmentPlan = m.TreatmentPlan,
            CreatedAt = m.CreatedAt,
            DoctorName = m.Doctor != null ? $"Dr. {m.Doctor.FirstName} {m.Doctor.LastName}" : string.Empty,
            InstitutionName = m.Institution != null ? m.Institution.Name : string.Empty,
            PatientName = m.Patient != null ? $"{m.Patient.FirstName} {m.Patient.LastName}" : string.Empty
        };
    }
}

public class CreateMedicalRecordDTO
{
    public int PatientId { get; set; }
    public int DoctorId { get; set; }
    public int InstitutionId { get; set; }
    public string Diagnosis { get; set; } = null!;
    public string? TreatmentPlan { get; set; }
}

public class UpdateMedicalRecordDTO
{
    public string Diagnosis { get; set; } = null!;
    public string? TreatmentPlan { get; set; }
}