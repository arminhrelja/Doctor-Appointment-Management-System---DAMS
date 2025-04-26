namespace Models.DTOs
{
    public class SymptomInputDTO
    {
        public string Symptoms { get; set; } = string.Empty;
    }

    public class DepartmentPredictionDTO
    {
        public string Department { get; set; } = string.Empty;
    }

    public class RiskInputDTO
    {
        public float Age { get; set; }
        public bool Smoker { get; set; }
        public bool Diabetes { get; set; }
        public string Gender { get; set; } = string.Empty;
    }

    public class RiskPredictionDTO
    {
        public float RiskScore { get; set; }
    }
}