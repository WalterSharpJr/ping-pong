using Microsoft.EntityFrameworkCore.Migrations;

namespace PingPong.Data.Migrations
{
    public partial class RemoveRankingFromPlayer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Rankings_PlayerId",
                table: "Rankings");

            migrationBuilder.CreateIndex(
                name: "IX_Rankings_PlayerId",
                table: "Rankings",
                column: "PlayerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Rankings_PlayerId",
                table: "Rankings");

            migrationBuilder.CreateIndex(
                name: "IX_Rankings_PlayerId",
                table: "Rankings",
                column: "PlayerId",
                unique: true);
        }
    }
}
