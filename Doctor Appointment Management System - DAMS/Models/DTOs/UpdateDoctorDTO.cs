namespace Doctor_Appointment_Management_System___DAMS.Models.DTOs
{
    public class UpdateDoctorDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Speciality { get; set; }
        public string? About { get; set; }
        public int? Experience { get; set; }
        public decimal? Fee { get; set; }
    }
}
