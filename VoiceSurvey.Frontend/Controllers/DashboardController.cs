using Microsoft.AspNetCore.Mvc;

public class DashboardController : Controller
{
       public IActionResult Index()
    {
        var token = HttpContext.Session.GetString("AuthToken");
        if (string.IsNullOrEmpty(token))
        {
            return RedirectToAction("Login", "Register");
        }

        ViewBag.Token = token;
        return View();
    }
      
    public IActionResult Index1()
    {
        return View();
    }

    public IActionResult Index2()
    {
        return View();
    }

    public IActionResult Surveylist()
    {
        return View();
    }
}
