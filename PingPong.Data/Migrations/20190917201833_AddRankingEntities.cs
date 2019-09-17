using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PingPong.Data.Migrations
{
    public partial class AddRankingEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RankingJobs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    StartedOn = table.Column<DateTimeOffset>(nullable: true),
                    FinishedOn = table.Column<DateTimeOffset>(nullable: true),
                    State = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RankingJobs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Rankings",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    PlayerId = table.Column<Guid>(nullable: true),
                    Rank = table.Column<int>(nullable: false),
                    PreviousRankId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rankings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rankings_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Rankings_Rankings_PreviousRankId",
                        column: x => x.PreviousRankId,
                        principalTable: "Rankings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rankings_PlayerId",
                table: "Rankings",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_Rankings_PreviousRankId",
                table: "Rankings",
                column: "PreviousRankId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RankingJobs");

            migrationBuilder.DropTable(
                name: "Rankings");
        }
    }
}
