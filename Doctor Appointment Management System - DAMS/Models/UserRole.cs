using System;
using System.Collections.Generic;

namespace Doctor_Appointment_Management_System___DAMS.Models;

public partial class UserRole
{
    public int RoleId { get; set; }

    public string RoleName { get; set; } = null!;

    public virtual ICollection<User> UserPrimaryRoles { get; set; } = new List<User>();

    public virtual ICollection<UserRoleMapping> UserRoleMappings { get; set; } = new List<UserRoleMapping>();

    public virtual ICollection<User> UserRoles { get; set; } = new List<User>();
}
