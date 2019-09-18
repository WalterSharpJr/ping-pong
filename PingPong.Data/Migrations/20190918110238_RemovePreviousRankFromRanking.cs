using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PingPong.Data.Migrations
{
    public partial class RemovePreviousRankFromRanking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rankings_Rankings_PreviousRankId",
                table: "Rankings");

            migrationBuilder.DropIndex(
                name: "IX_Rankings_PreviousRankId",
                table: "Rankings");

            migrationBuilder.DropColumn(
                name: "PreviousRankId",
                table: "Rankings");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PreviousRankId",
                table: "Rankings",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rankings_PreviousRankId",
                table: "Rankings",
                column: "PreviousRankId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rankings_Rankings_PreviousRankId",
                table: "Rankings",
                column: "PreviousRankId",
                principalTable: "Rankings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
