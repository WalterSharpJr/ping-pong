﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using PingPong.Data;

namespace PingPong.Data.Migrations
{
    [DbContext(typeof(PingPongContext))]
    partial class PingPongContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("PingPong.Data.Game", b =>
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

            modelBuilder.Entity("PingPong.Data.Player", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("FirstName")
                        .HasMaxLength(64);

                    b.Property<string>("LastName")
                        .HasMaxLength(64);

                    b.HasKey("Id");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("PingPong.Data.Ranking", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("PlayerId");

                    b.Property<Guid?>("PreviousRankId");

                    b.Property<int>("Rank");

                    b.HasKey("Id");

                    b.HasIndex("PlayerId");

                    b.HasIndex("PreviousRankId");

                    b.ToTable("Rankings");
                });

            modelBuilder.Entity("PingPong.Data.RankingJob", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset?>("FinishedOn");

                    b.Property<DateTimeOffset?>("StartedOn");

                    b.Property<int>("State");

                    b.HasKey("Id");

                    b.ToTable("RankingJobs");
                });

            modelBuilder.Entity("PingPong.Data.Game", b =>
                {
                    b.HasOne("PingPong.Data.Player", "Player1")
                        .WithMany()
                        .HasForeignKey("Player1Id");

                    b.HasOne("PingPong.Data.Player", "Player2")
                        .WithMany()
                        .HasForeignKey("Player2Id");

                    b.HasOne("PingPong.Data.Player", "WinningPlayer")
                        .WithMany()
                        .HasForeignKey("WinningPlayerId");
                });

            modelBuilder.Entity("PingPong.Data.Ranking", b =>
                {
                    b.HasOne("PingPong.Data.Player", "Player")
                        .WithMany()
                        .HasForeignKey("PlayerId");

                    b.HasOne("PingPong.Data.Ranking", "PreviousRank")
                        .WithMany()
                        .HasForeignKey("PreviousRankId");
                });
#pragma warning restore 612, 618
        }
    }
}
