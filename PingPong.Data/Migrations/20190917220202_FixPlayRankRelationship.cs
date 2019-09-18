using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PingPong.Data.Migrations
{
    public partial class FixPlayRankRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Players_Player1Id",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Games_Players_Player2Id",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Games_Players_WinningPlayerId",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Rankings_Players_PlayerId",
                table: "Rankings");

            migrationBuilder.DropIndex(
                name: "IX_Rankings_PlayerId",
                table: "Rankings");

            migrationBuilder.AlterColumn<Guid>(
                name: "PlayerId",
                table: "Rankings",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "WinningPlayerId",
                table: "Games",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "Player2Id",
                table: "Games",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "Player1Id",
                table: "Games",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rankings_PlayerId",
                table: "Rankings",
                column: "PlayerId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Players_Player1Id",
                table: "Games",
                column: "Player1Id",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Players_Player2Id",
                table: "Games",
                column: "Player2Id",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Players_WinningPlayerId",
                table: "Games",
                column: "WinningPlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rankings_Players_PlayerId",
                table: "Rankings",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Players_Player1Id",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Games_Players_Player2Id",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Games_Players_WinningPlayerId",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Rankings_Players_PlayerId",
                table: "Rankings");

            migrationBuilder.DropIndex(
                name: "IX_Rankings_PlayerId",
                table: "Rankings");

            migrationBuilder.AlterColumn<Guid>(
                name: "PlayerId",
                table: "Rankings",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<Guid>(
                name: "WinningPlayerId",
                table: "Games",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<Guid>(
                name: "Player2Id",
                table: "Games",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<Guid>(
                name: "Player1Id",
                table: "Games",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.CreateIndex(
                name: "IX_Rankings_PlayerId",
                table: "Rankings",
                column: "PlayerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Players_Player1Id",
                table: "Games",
                column: "Player1Id",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Players_Player2Id",
                table: "Games",
                column: "Player2Id",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Players_WinningPlayerId",
                table: "Games",
                column: "WinningPlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rankings_Players_PlayerId",
                table: "Rankings",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
