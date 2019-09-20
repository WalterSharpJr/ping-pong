using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PingPong.Business.Services;
using PingPong.Data;

namespace PingPong.Business.Tests
{
	[TestClass]
	public class PlayerRankerTests
    {
		private PingPongContext Context;
		private PlayerRanker Service;

		Data.Player Player1, Player2, Player3, Player4, Player5, Player6;

		void AddGame(Data.PingPongContext context, Guid player1, Guid player2, Byte player1Score, Byte player2Score, Guid winner)
		{
			context.Games.Add(new Data.Game() { Id = Guid.NewGuid(), 
													Player1Id = player1,
													Player2Id = player2,
													WinningPlayerId = winner,
													PlayedOn = DateTime.Now, Player1Score = player1Score, Player2Score = player2Score
												 });
		}

		Guid AddJob()
		{
			var jobId = Guid.NewGuid();

			Context.RankingJobs.Add(new Data.RankingJob() { Id = jobId, State = Data.RankingJobStates.Running, StartedOn = DateTime.Now });
			Context.SaveChanges();

			return jobId;
		}

		[TestInitialize]
		public void Initialise()
		{
			var options = new DbContextOptionsBuilder<Data.PingPongContext>().UseInMemoryDatabase(databaseName: "PingPong" + Guid.NewGuid().ToString()).Options;
            Context = new Data.PingPongContext(options);

			Player1 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test1Firstname", LastName= "Test1Lastname"  };
			Player2 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test2Firstname", LastName= "Test2Lastname"  };
			Player3 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test3Firstname", LastName= "Test3Lastname"  };
			Player4 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test4Firstname", LastName= "Test4Lastname"  };
			Player5 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test5Firstname", LastName= "Test5Lastname"  };
			Player6 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test6Firstname", LastName= "Test6Lastname"  };

			Context.Players.Add(Player1);
			Context.Players.Add(Player2);
			Context.Players.Add(Player3);
			Context.Players.Add(Player4);
			Context.Players.Add(Player5);
			Context.Players.Add(Player6);
			
			//populate the games
			AddGame(Context, Player1.Id, Player2.Id, 5, 3, Player1.Id);
			AddGame(Context, Player1.Id, Player3.Id, 7, 4, Player1.Id);
			AddGame(Context, Player1.Id, Player4.Id, 6, 3, Player1.Id);
			AddGame(Context, Player2.Id, Player3.Id, 5, 3, Player2.Id);
			AddGame(Context, Player2.Id, Player4.Id, 5, 3, Player2.Id);
			AddGame(Context, Player3.Id, Player4.Id, 5, 3, Player3.Id);
												
			Context.SaveChanges();

            this.Context = new Data.PingPongContext(options);
            this.Service = new PlayerRanker(Context);
		}

		[TestMethod]
		public void UpdatesJobCorrectly()
        {
			Service.RankPlayers(AddJob());

			//make sure job is updated correctly
			Assert.AreEqual(Context.RankingJobs.First().State, Data.RankingJobStates.Finished);
			Assert.IsNotNull(Context.RankingJobs.First().FinishedOn);
		}

		[TestMethod]
		public void CreatesTheRightAmountofRankEntities()
        {
			Service.RankPlayers(AddJob());

			//make sure that there is a ranking for all 6 players
			Assert.AreEqual(Context.Rankings.Count(), 6);

		}

		[TestMethod]
		public void CorrectlyRanks()
        {
			Service.RankPlayers(AddJob());

			//make sure the top 3 players are Test1, Test2 and Test3
			var rank1 = Context.Rankings.First(r => r.Rank == 1);
			var rank2 = Context.Rankings.First(r => r.Rank == 2);
			var rank3 = Context.Rankings.First(r => r.Rank == 3);

			Assert.AreEqual(rank1.PlayerId, Player1.Id);
			Assert.AreEqual(rank2.PlayerId, Player2.Id);
			Assert.AreEqual(rank3.PlayerId, Player3.Id);
		}

		[TestMethod]
		public void AssignsJobIdToRanks()
        {
			var jobId = AddJob();

			Service.RankPlayers(jobId);

			//make sure they all have the correct job Ids assigned
			Assert.AreEqual(Context.Rankings.Count(r => r.RankingJobId == jobId), 6);
		}		
    }
}