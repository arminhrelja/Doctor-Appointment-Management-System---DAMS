namespace Doctor_Appointment_Management_System___DAMS.DTOs
{
    public class DoctorDto
    {
        public int UserId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Speciality { get; set; } = null!;
        public string About { get; set; } = null!;
        public int Experience { get; set; }
        public decimal Fee { get; set; }
    }
}
