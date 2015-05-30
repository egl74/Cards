using System;
using System.Globalization;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Cards.Web.Helpers;
using Microsoft.Ajax.Utilities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Cards.Web.Models;

namespace Cards.Web.Controllers
{
    public class CardController : Controller
    {
        // GET: Card
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult MainManageCards()
        {
            return View();
        }

        public ActionResult CardTemplates()
        {
            return View();
        }

        public ActionResult EditCard()
        {
            ApplicationDbContext Context = new ApplicationDbContext();
            string currentUserId = User.Identity.GetUserId();
            var model = Context.Infoes.Where(i => i.UserId == currentUserId);
            return View(model);
        }

        public JsonResult SaveInfo()
        {
            try
            {
                //проверка, что все параметры передаются верно
                System.Diagnostics.Debug.WriteLine("CardId: " + Request.Params["CardId"]);
                System.Diagnostics.Debug.WriteLine("CardTemplate: " + Request.Params["CardTemplate"]);
                System.Diagnostics.Debug.WriteLine("CardName: " + Request.Params["CardName"]);
                System.Diagnostics.Debug.WriteLine("CardInfoes: " + Request.Params["CardInfoes"]);
                System.Diagnostics.Debug.WriteLine("CardInfoesLength: " + Request.Params["CardInfoesLength"]);

                //тут строку CardInfoes разделяю на параметры: InfoId, PositionX, PositionY
                String[] buf = Request.Params["CardInfoes"].Split('|');
                int length = System.Int32.Parse(Request.Params["CardInfoesLength"]);
                for (int i = 0; i < length; i++)
                {
                    System.Diagnostics.Debug.WriteLine("InfoId = " + buf[0 + 3 * i]);
                    System.Diagnostics.Debug.WriteLine("PositionX = " + buf[1 + 3 * i]);
                    System.Diagnostics.Debug.WriteLine("PositionY = " + buf[2 + 3 * i]);
                }

                return Json(true);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}