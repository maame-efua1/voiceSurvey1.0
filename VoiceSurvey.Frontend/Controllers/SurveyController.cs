using Microsoft.AspNetCore.Mvc;

public class SurveyController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Create()
    {
        return View();
    }
}
