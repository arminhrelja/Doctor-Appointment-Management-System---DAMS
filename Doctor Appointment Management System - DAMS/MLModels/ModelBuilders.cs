using Microsoft.ML;
using Doctor_Appointment_Management_System___DAMS.Models.ML;
using Microsoft.ML.Data;

namespace Doctor_Appointment_Management_System___DAMS.MLModels;

public static class DepartmentClassificationModelBuilder
{
    public static void TrainAndSave(string dataPath, string modelPath)
    {
        var mlContext = new MLContext();
        var data = mlContext.Data.LoadFromTextFile<SymptomData>(dataPath, hasHeader: true, separatorChar: ',');
        var pipeline = mlContext.Transforms.Text.FeaturizeText("Features", nameof(SymptomData.Symptoms))
            .Append(mlContext.Transforms.Conversion.MapValueToKey("Label", nameof(SymptomData.Department)))
            .Append(mlContext.MulticlassClassification.Trainers.SdcaMaximumEntropy("Label", "Features"))
            .Append(mlContext.Transforms.Conversion.MapKeyToValue("PredictedLabel"));
        var model = pipeline.Fit(data);
        mlContext.Model.Save(model, data.Schema, modelPath);
    }
}

public static class RiskPredictionModelBuilder
{
    public static void TrainAndSave(string dataPath, string modelPath)
    {
        var mlContext = new MLContext();
        var data = mlContext.Data.LoadFromTextFile<RiskData>(dataPath, hasHeader: true, separatorChar: ',');
        var pipeline = mlContext.Transforms.Categorical.OneHotEncoding("Gender")
            .Append(mlContext.Transforms.Conversion.ConvertType(new[] {
                new InputOutputColumnPair("Smoker", "Smoker"),
                new InputOutputColumnPair("Diabetes", "Diabetes")
            }, DataKind.Single))
            .Append(mlContext.Transforms.Concatenate("Features", "Age", "Smoker", "Diabetes", "Gender"))
            .Append(mlContext.Regression.Trainers.Sdca(labelColumnName: "RiskScore", maximumNumberOfIterations: 100));
        var model = pipeline.Fit(data);
        mlContext.Model.Save(model, data.Schema, modelPath);
    }
}