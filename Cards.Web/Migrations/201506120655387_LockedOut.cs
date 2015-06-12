namespace Cards.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LockedOut : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.AspNetUsers", "IsBlocked");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "IsBlocked", c => c.Boolean(nullable: false));
        }
    }
}
