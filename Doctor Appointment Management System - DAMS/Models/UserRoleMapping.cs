using System;
using System.Collections.Generic;

namespace Doctor_Appointment_Management_System___DAMS.Models;

public partial class UserRoleMapping
{
    public int UserRoleMappingId { get; set; }

    public int UserId { get; set; }

    public int RoleId { get; set; }

    public virtual UserRole Role { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
