﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace PingPong.Data.Migrations
{
    [DbContext(typeof(PingPongContext))]
    [Migration("20190917153906_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("PingPong.API.Data.Game", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<Guid?>("Player1Id");

                    b.Property<byte>("Player1Score");

                    b.Property<Guid?>("Player2Id");

                    b.Property<byte>("Player2Score");

                    b.Property<Guid?>("WinningPlayerId");

                    b.HasKey("Id");

                    b.HasIndex("Player1Id");

                    b.HasIndex("Player2Id");

                    b.HasIndex("WinningPlayerId");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("PingPong.API.Data.Player", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.HasKey("Id");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("PingPong.API.Data.Game", b =>
                {
                    b.HasOne("PingPong.API.Data.Player", "Player1")
                        .WithMany()
                        .HasForeignKey("Player1Id");

                    b.HasOne("PingPong.API.Data.Player", "Player2")
                        .WithMany()
                        .HasForeignKey("Player2Id");

                    b.HasOne("PingPong.API.Data.Player", "WinningPlayer")
                        .WithMany()
                        .HasForeignKey("WinningPlayerId");
                });
#pragma warning restore 612, 618
        }
    }
}