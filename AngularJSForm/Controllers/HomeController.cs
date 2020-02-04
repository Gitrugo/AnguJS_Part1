using AngularJSForm.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace AngularJSForm.Controllers
{
  public class HomeController : Controller
  {

    // GET: Home
    public ActionResult Index()
    {
      return View();
    }

    [HttpPost]
    public JsonResult CreateCustomer(Customer model)
    {
      if (ModelState.IsValid)
      {
        //Data save to database
        long nId = 0;
        if (modKozos.tbCust.Count > 0)
          nId= modKozos.tbCust.Max(p => p.Id)+1;
        model.Id = nId;
        modKozos.tbCust.Add(model);
       
        //var RedirectUrl = Url.Action("About", "Home", new { area = "" });
        return Json(new { success = true, nid = nId.ToString() });
        //return Json(new { success = true, redirectUrl = RedirectUrl });
      }
      return Json(new
      {
        success = false,
        errors = ModelState.Keys.SelectMany(i => ModelState[i].Errors).Select(m => m.ErrorMessage).ToArray()
      });
    }

    // [FromForm]

    [HttpPost]
    public JsonResult UjVevo( Customer model)
    {
      if (ModelState.IsValid)
      {
        //Data save to database
        long nId = 0;
        if (modKozos.tbCust.Count > 0)
          nId = modKozos.tbCust.Max(p => p.Id) + 1;
        model.Id = nId;
        modKozos.tbCust.Add(model);

        //var RedirectUrl = Url.Action("About", "Home", new { area = "" });
        return Json(new { success = true, nid = nId.ToString() });
        //return Json(new { success = true, redirectUrl = RedirectUrl });
      }
      return Json(new
      {
        success = false,
        errors = ModelState.Keys.SelectMany(i => ModelState[i].Errors).Select(m => m.ErrorMessage).ToArray()
      });
    }

    // GET: Home/About
    public ActionResult About()
    {
      return View();
    }
  }
}