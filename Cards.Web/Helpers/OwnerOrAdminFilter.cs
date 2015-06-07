using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Cards.Web.Models;
using Microsoft.AspNet.Identity;

namespace Cards.Web.Helpers
{
    public class OwnerOrAdminFilter: ActionFilterAttribute
    {
        protected readonly ApplicationDbContext Context = new ApplicationDbContext();
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var currentUserId = filterContext.HttpContext.User.Identity.GetUserId();
            var ownerId = Convert.ToString(filterContext.ActionParameters["userId"]);
            if (Context.Users.Single(u => u.Id == currentUserId).IsAdmin || ownerId == currentUserId)
            {
                base.OnActionExecuting(filterContext);
            }
            else
            {
                filterContext.Result = new RedirectResult("/Home/AccessDenied");
            }
        }
    }
}