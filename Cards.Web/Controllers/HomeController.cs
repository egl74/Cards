﻿using System;
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

namespace Cards.Web.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            var model = Context.Cards.OrderByDescending(c => c.Rating).ToList();
            return View(model);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            return View();
        }
    }
}