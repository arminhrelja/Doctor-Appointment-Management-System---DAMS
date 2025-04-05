namespace Doctor_Appointment_Management_System___DAMS.Models.DTOs
{
    public class AddDoctorDTO
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Speciality { get; set; }
        public int? Experience { get; set; }
        public decimal? Fee { get; set; }
        public string? About { get; set; }
    }
}
