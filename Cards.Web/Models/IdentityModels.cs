using System.Collections.Generic;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Cards.Web.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class User : IdentityUser
    {
        public User()
        {
            this.Cards = new HashSet<Card>();
            this.Infoes = new HashSet<Info>();
        }

        public bool IsAdmin { get; set; }
        public bool IsBlocked { get; set; }

        public virtual ICollection<Card> Cards { get; set; }
        public virtual ICollection<Info> Infoes { get; set; }


        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public partial class Info
    {
        public Info()
        {
            this.CardInfoes = new HashSet<CardInfo>();
        }

        public int Id { get; set; }
        public string UserId { get; set; }
        public int Type { get; set; }
        public string Content { get; set; }
        public string Comment { get; set; }

        public virtual ICollection<CardInfo> CardInfoes { get; set; }
        public virtual User User { get; set; }
    }

    public partial class Card
    {
        public Card()
        {
            this.CardInfoes = new HashSet<CardInfo>();
        }

        public int Id { get; set; }
        public string UserId { get; set; }
        public int Template { get; set; }
        public string Name { get; set; }
        public int Rating { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<CardInfo> CardInfoes { get; set; }
    }

    public partial class CardInfo
    {
        public int Id { get; set; }
        public int CardId { get; set; }
        public int InfoId { get; set; }
        public int PositionX { get; set; }
        public int PositionY { get; set; }

        public virtual Card Card { get; set; }
        public virtual Info Info { get; set; }
    }

    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Info>()
                        .HasRequired(i => i.User)
                        .WithMany(u => u.Infoes)
                        .HasForeignKey(i => i.UserId)
                        .WillCascadeOnDelete(true);

            modelBuilder.Entity<Card>()
                        .HasRequired(c => c.User)
                        .WithMany(u => u.Cards)
                        .HasForeignKey(c => c.UserId)
                        .WillCascadeOnDelete(true);

            modelBuilder.Entity<CardInfo>()
                        .HasRequired(t => t.Card)
                        .WithMany(t => t.CardInfoes)
                        .HasForeignKey(d => d.CardId)
                        .WillCascadeOnDelete(true);

            modelBuilder.Entity<CardInfo>()
                        .HasRequired(t => t.Info)
                        .WithMany(t => t.CardInfoes)
                        .HasForeignKey(d => d.InfoId)
                        .WillCascadeOnDelete(true);

            base.OnModelCreating(modelBuilder);
        }

        public virtual DbSet<Card> Cards { get; set; }
        public virtual DbSet<Info> Infoes { get; set; }
        public virtual DbSet<CardInfo> CardInfoes { get; set; }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}