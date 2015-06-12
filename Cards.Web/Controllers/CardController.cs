using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Cards.Web.Models;

namespace Cards.Web.Controllers
{
    public class CardController : BaseController
    {

        public ActionResult ManageCards()
        {
            string currentUserId = User.Identity.GetUserId();
            var model = Context.Cards.Where(i => i.UserId == currentUserId).ToList();
            return View(model);
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
                Session["createdNewCard"] = "yes";
                return Json(true);
            }
            catch (Exception)
            {
                return Json(false);
            }
        }

        public async Task<JsonResult> ChangeRating()
        {
            try
            {
                var toDo = Request.Params["ToDo"];
                var cardId = Convert.ToInt32(Request.Params["CardId"]);
                if (Session["rating" + cardId] == null)
                {
                    Session["rating" + cardId] = "set";
                    var currentCard = Context.Cards.Single(c => c.Id == cardId);
                    if (toDo.Equals("up"))
                        currentCard.Rating++;
                    else
                        currentCard.Rating--;
                    await Context.SaveChangesAsync();
                    return Json(toDo);
                }
                return Json(true);
            }
            catch (Exception)
            {
                return Json(false);
            }
        }

        public JsonResult CheckRatingButtons()
        {
            try
            {
                var cardsCount = Convert.ToInt32(Request.Params["Count"]);
                String[] buf = Request.Params["CardIds"].Split('|');
                var ids = ""; 
                for (int i = 0; i < cardsCount; i++)
                {
                    var cardId = Convert.ToInt32(buf[i]);
                    if (Session["rating" + cardId] != null)
                    {
                        ids += cardId + "|";
                    }
                }
                return Json(ids);
            }
            catch (Exception)
            {
                return Json(false);
            }
        }

        public JsonResult DeleteCard()
        {
            try
            {
                var cardId = Convert.ToInt32(Request.Params["CardId"]);
                //!!!!!!!!!!!!!!!!Удалить визитку cardId
                //System.Diagnostics.Debug.WriteLine("id: " + cardId);
                return Json(true);
            }
            catch (Exception)
            {
                return Json(false);
            }
        }
    }
}