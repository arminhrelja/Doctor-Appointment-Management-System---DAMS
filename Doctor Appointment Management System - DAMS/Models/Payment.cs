using System;
using System.Collections.Generic;

namespace Doctor_Appointment_Management_System___DAMS.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int PatientId { get; set; }

    public int AppointmentId { get; set; }

    public decimal Fee { get; set; }

    public int StatusId { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Appointment Appointment { get; set; } = null!;

    public virtual PaymentStatus Status { get; set; } = null!;
}
