using Microsoft.ML;
using Doctor_Appointment_Management_System___DAMS.Models.ML;
using Models.DTOs;

namespace Doctor_Appointment_Management_System___DAMS.Services;

public class DepartmentPredictionService
{
    private readonly PredictionEngine<SymptomData, DepartmentPrediction> _engine;
    public DepartmentPredictionService()
    {
        var mlContext = new MLContext();
        var model = mlContext.Model.Load("MLModels/department-classification-model.zip", out _);
        _engine = mlContext.Model.CreatePredictionEngine<SymptomData, DepartmentPrediction>(model);
    }
    public string PredictDepartment(string symptoms)
        => _engine.Predict(new SymptomData { Symptoms = symptoms }).Department;
}

public class RiskPredictionService
{
    private readonly PredictionEngine<RiskData, RiskPrediction> _engine;
    public RiskPredictionService()
    {
        var mlContext = new MLContext();
        var model = mlContext.Model.Load("MLModels/risk-prediction-model.zip", out _);
        _engine = mlContext.Model.CreatePredictionEngine<RiskData, RiskPrediction>(model);
    }
    public float PredictRisk(RiskInputDTO input)
        => _engine.Predict(new RiskData
        {
            Age = input.Age,
            Smoker = input.Smoker,
            Diabetes = input.Diabetes,
            Gender = input.Gender
        }).Score;
}