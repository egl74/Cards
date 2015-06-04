using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Cards.Web.Helpers;
using Microsoft.Ajax.Utilities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Cards.Web.Models;
using Newtonsoft.Json;

namespace Cards.Web.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllCards()
        {
            //var model = Context.CardInfoes;
            //return View(model);
            //System.Diagnostics.Debug.WriteLine("1");
            try
            {
                //item.UserId = User.Identity.GetUserId();
                //var added = Context.Infoes.Add(item);
                //await Context.SaveChangesAsync();
                //var added = Context.Infoes;
                //System.Diagnostics.Debug.WriteLine("2");
                //return Json(added);
                return Json(true);
                //string currentUserId = User.Identity.GetUserId();
                //System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                //List<CardInfo> cil = new List<CardInfo>();
                //cil = Context.CardInfoes;
                //var jsonUser = JsonConvert.SerializeObject(Context.CardInfoes);
                //System.Diagnostics.Debug.WriteLine(jsonUser);
                //System.Text.St
                //return Json(serializer.Serialize(myObject));
            //    var list = new List<object[]>(); 
            //    List<CardInfo> cil = new List<CardInfo>();
            //    cil = Context.CardInfoes;
            //    for (int i = 0; i < cil.Count; i++)
            //    {

            //    }
            //        list = Context.CardInfoes;
            //return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false);
            }
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            return View();
        }
    }
}