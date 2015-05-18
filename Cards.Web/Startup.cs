using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Cards.Web.Startup))]
namespace Cards.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
