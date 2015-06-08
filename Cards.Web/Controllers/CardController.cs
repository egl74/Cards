﻿using System;
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
    public class CardController : BaseController
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
            string currentUserId = User.Identity.GetUserId();
            var model = Context.Infoes.Where(i => i.UserId == currentUserId);
            return View(model);
        }

        public JsonResult SaveInfo()
        {
            try
            {
                //System.Diagnostics.Debug.WriteLine("Example");

                var cardId = Convert.ToInt32(Request.Params["CardId"]);
                var cardTemplate = Convert.ToInt32(Request.Params["CardTemplate"]);
                var cardName = Request.Params["CardName"];
                //var cardInfoes = Request.Params["CardInfoes"];
                var cardInfoesLength = Convert.ToInt32(Request.Params["CardInfoesLength"]);
                String[] buf = Request.Params["CardInfoes"].Split('|');

                Card card = cardId == 0 ? Context.Cards.Add(new Card {Template = cardTemplate, Name = cardName, UserId = User.Identity.GetUserId()}) : Context.Cards.Single(c => c.Id == cardId);
                card.CardInfoes.Clear();

                for (int i = 0; i < cardInfoesLength; i++)
                {
                    var infoId = Convert.ToInt32(buf[0 + 3 * i]);
                    var posX = Convert.ToInt32(buf[1 + 3 * i]);
                    var posY = Convert.ToInt32(buf[2 + 3 * i]);
                    card.CardInfoes.Add(new CardInfo
                    {
                        CardId = cardId,
                        InfoId = infoId,
                        PositionX = posX,
                        PositionY = posY
                    });
                }
                Context.SaveChanges();

                return Json(true);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public JsonResult ChangeRating()
        {
            try
            {
                var toDo = Request.Params["ToDo"];
                var cardId = Convert.ToInt32(Request.Params["CardId"]);
                if (Session["rating" + cardId] == null)
                {
                    Session["rating" + cardId] = "set";
                    if (toDo.Equals("up"))
                    {
                        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        //Рейтинг визитки cardId увеличен
                    }
                    else
                    {
                        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        //Рейтинг визитки cardId уменьшен
                    }
                    return Json(toDo);
                }
                return Json(true);
            }
            catch (Exception)
            {
                return Json(false);
            }
        }
    }
}