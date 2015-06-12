namespace Cards.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CardDelete : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CardInfoes", "InfoId", "dbo.Infoes");
            AddForeignKey("dbo.CardInfoes", "InfoId", "dbo.Infoes", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CardInfoes", "InfoId", "dbo.Infoes");
            AddForeignKey("dbo.CardInfoes", "InfoId", "dbo.Infoes", "Id", cascadeDelete: true);
        }
    }
}
