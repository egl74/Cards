using System.Linq;
using System.Web.Mvc;

namespace Cards.Web.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            var model = Context.Cards.OrderByDescending(c => c.Rating).ToList();
            return View(model);
        }

        public ActionResult AccessDenied()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            return View();
        }
    }
}