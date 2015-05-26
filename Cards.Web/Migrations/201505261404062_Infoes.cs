namespace Cards.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Infoes : DbMigration
    {
        public override void Up()
        {
            RenameTable("Infos", "Infoes");
            RenameTable("CardInfos", "CardInfoes");
        }
        
        public override void Down()
        {
            RenameTable("CardInfoes", "CardInfos");
            RenameTable("Infoes", "Infos");
        }
    }
}
