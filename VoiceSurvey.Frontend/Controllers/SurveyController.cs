using Microsoft.AspNetCore.Mvc;

public class SurveyController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
