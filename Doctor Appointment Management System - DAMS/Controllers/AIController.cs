using Doctor_Appointment_Management_System___DAMS.Models.DTOs;
using Doctor_Appointment_Management_System___DAMS.Services;
using Microsoft.AspNetCore.Mvc;
using Models.DTOs;

namespace Doctor_Appointment_Management_System___DAMS.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AIController : ControllerBase
{
    private readonly DepartmentPredictionService _departmentService;
    private readonly RiskPredictionService _riskService;
    public AIController(DepartmentPredictionService departmentService, RiskPredictionService riskService)
    {
        _departmentService = departmentService;
        _riskService = riskService;
    }

    [HttpPost("classify-department")]
    public ActionResult<DepartmentPredictionDTO> ClassifyDepartment([FromBody] SymptomInputDTO dto)
        => Ok(new DepartmentPredictionDTO { Department = _departmentService.PredictDepartment(dto.Symptoms) });

    [HttpPost("predict-risk")]
    public ActionResult<RiskPredictionDTO> PredictRisk([FromBody] RiskInputDTO dto)
        => Ok(new RiskPredictionDTO { RiskScore = _riskService.PredictRisk(dto) });
}