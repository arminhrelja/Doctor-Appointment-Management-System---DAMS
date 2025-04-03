using System;
using System.Collections.Generic;

namespace Doctor_Appointment_Management_System___DAMS.Models;

public partial class Department
{
    public int DepartmentId { get; set; }

    public int InstitutionId { get; set; }

    public string DepartmentName { get; set; } = null!;

    public string? Description { get; set; }

    public virtual HealthCareInstitution Institution { get; set; } = null!;

    public virtual ICollection<UserInstitution> UserInstitutions { get; set; } = new List<UserInstitution>();
}
