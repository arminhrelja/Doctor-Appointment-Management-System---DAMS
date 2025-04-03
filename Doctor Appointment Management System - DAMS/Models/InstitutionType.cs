using System;
using System.Collections.Generic;

namespace Doctor_Appointment_Management_System___DAMS.Models;

public partial class InstitutionType
{
    public int InstitutionTypeId { get; set; }

    public string TypeName { get; set; } = null!;

    public virtual ICollection<HealthCareInstitution> HealthCareInstitutions { get; set; } = new List<HealthCareInstitution>();
}
