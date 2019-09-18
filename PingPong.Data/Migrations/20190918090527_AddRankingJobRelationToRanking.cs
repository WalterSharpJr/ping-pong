using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PingPong.Data.Migrations
{
    public partial class AddRankingJobRelationToRanking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "RankingJobId",
                table: "Rankings",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Rankings_RankingJobId",
                table: "Rankings",
                column: "RankingJobId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rankings_RankingJobs_RankingJobId",
                table: "Rankings",
                column: "RankingJobId",
                principalTable: "RankingJobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rankings_RankingJobs_RankingJobId",
                table: "Rankings");

            migrationBuilder.DropIndex(
                name: "IX_Rankings_RankingJobId",
                table: "Rankings");

            migrationBuilder.DropColumn(
                name: "RankingJobId",
                table: "Rankings");
        }
    }
}
