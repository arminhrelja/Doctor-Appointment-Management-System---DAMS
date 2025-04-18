namespace Doctor_Appointment_Management_System___DAMS.Models.DTOs
{
    public class BookAppointmentDTO
    {
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public string AppointmentDate { get; set; } = string.Empty; // ISO string
        public string Status { get; set; } = string.Empty;
    }
}