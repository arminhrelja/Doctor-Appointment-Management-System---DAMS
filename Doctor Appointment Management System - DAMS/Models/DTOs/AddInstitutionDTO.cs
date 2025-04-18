namespace Doctor_Appointment_Management_System___DAMS.Models.DTOs
{
    public class AddInstitutionDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public int InstitutionTypeId { get; set; }
    }
}