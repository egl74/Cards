namespace Cards.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Cascade : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Cards", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Infoes", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.Cards", new[] { "UserId" });
            DropIndex("dbo.Infoes", new[] { "UserId" });
            AlterColumn("dbo.Cards", "UserId", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.Infoes", "UserId", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.Cards", "UserId");
            CreateIndex("dbo.Infoes", "UserId");
            AddForeignKey("dbo.Cards", "UserId", "dbo.AspNetUsers", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Infoes", "UserId", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Infoes", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Cards", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.Infoes", new[] { "UserId" });
            DropIndex("dbo.Cards", new[] { "UserId" });
            AlterColumn("dbo.Infoes", "UserId", c => c.String(maxLength: 128));
            AlterColumn("dbo.Cards", "UserId", c => c.String(maxLength: 128));
            CreateIndex("dbo.Infoes", "UserId");
            CreateIndex("dbo.Cards", "UserId");
            AddForeignKey("dbo.Infoes", "UserId", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.Cards", "UserId", "dbo.AspNetUsers", "Id");
        }
    }
}
