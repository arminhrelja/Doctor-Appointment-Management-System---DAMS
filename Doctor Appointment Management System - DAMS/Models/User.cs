using System;
using System.Collections.Generic;

namespace Doctor_Appointment_Management_System___DAMS.Models;

public partial class User
{
    public int UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public DateTime? CreatedAt { get; set; }

    public int RoleId { get; set; }

    public string? Speciality { get; set; }

    public int? Experience { get; set; }

    public string? About { get; set; }

    public decimal? Fee { get; set; }

    public int? PrimaryRoleId { get; set; }

    public virtual ICollection<Appointment> AppointmentDoctors { get; set; } = new List<Appointment>();

    public virtual ICollection<Appointment> AppointmentPatients { get; set; } = new List<Appointment>();

    public virtual ICollection<MedicalRecord> MedicalRecordDoctors { get; set; } = new List<MedicalRecord>();

    public virtual ICollection<MedicalRecord> MedicalRecordPatients { get; set; } = new List<MedicalRecord>();

    public virtual ICollection<Prescription> PrescriptionDoctors { get; set; } = new List<Prescription>();

    public virtual ICollection<Prescription> PrescriptionPatients { get; set; } = new List<Prescription>();

    public virtual UserRole? PrimaryRole { get; set; }

    public virtual UserRole Role { get; set; } = null!;

    public virtual ICollection<UserInstitution> UserInstitutions { get; set; } = new List<UserInstitution>();

    public virtual ICollection<UserRoleMapping> UserRoleMappings { get; set; } = new List<UserRoleMapping>();
}
