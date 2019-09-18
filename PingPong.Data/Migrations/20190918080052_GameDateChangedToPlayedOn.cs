using Microsoft.EntityFrameworkCore.Migrations;

namespace PingPong.Data.Migrations
{
    public partial class GameDateChangedToPlayedOn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Games",
                newName: "PlayedOn");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlayedOn",
                table: "Games",
                newName: "Date");
        }
    }
}
