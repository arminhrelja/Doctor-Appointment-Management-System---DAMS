using Microsoft.ML.Data;

namespace Doctor_Appointment_Management_System___DAMS.Models.ML;

public class SymptomData
{
    [LoadColumn(0)]
    public string Symptoms { get; set; } = string.Empty;
    [LoadColumn(1)]
    public string Department { get; set; } = string.Empty;
}

public class DepartmentPrediction
{
    [ColumnName("PredictedLabel")]
    public string Department { get; set; } = string.Empty;
}

public class RiskData
{
    [LoadColumn(0)]
    public float Age { get; set; }
    [LoadColumn(1)]
    public bool Smoker { get; set; }
    [LoadColumn(2)]
    public bool Diabetes { get; set; }
    [LoadColumn(3)]
    public string Gender { get; set; } = string.Empty;
    [LoadColumn(4)]
    public float RiskScore { get; set; }
}

public class RiskPrediction
{
    public float Score { get; set; }
}