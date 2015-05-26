using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
    }
}