namespace Doctor_Appointment_Management_System___DAMS.DTOs
{
    public class DoctorDto
{
    public int UserId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Speciality { get; set; } = "Unknown";
    public string About { get; set; } = "No description available.";
    public int Experience { get; set; } = 0;
    public decimal Fee { get; set; } = 0;
} 
}
