using System;
using System.Collections.Generic;

namespace Doctor_Appointment_Management_System___DAMS.Models;

public partial class Prescription
{
    public int PrescriptionId { get; set; }

    public int PatientId { get; set; }

    public int DoctorId { get; set; }

    public int InstitutionId { get; set; }

    public string Medication { get; set; } = null!;

    public string Dosage { get; set; } = null!;

    public string? Instructions { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual User Doctor { get; set; } = null!;

    public virtual HealthCareInstitution Institution { get; set; } = null!;

    public virtual User Patient { get; set; } = null!;
}
